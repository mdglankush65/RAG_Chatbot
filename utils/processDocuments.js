const { JSONLoader, JSONLinesLoader } = require("langchain/document_loaders/fs/json");
const { TextLoader } = require("langchain/document_loaders/fs/text");
const { CSVLoader } = require("@langchain/community/document_loaders/fs/csv");
const { PDFLoader } = require("@langchain/community/document_loaders/fs/pdf");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { MemoryVectorStore } = require("langchain/vectorstores/memory");
// const { OpenAIEmbeddings } = require("@langchain/openai");
const { GoogleGenerativeAIEmbeddings } = require("@langchain/google-genai");
const { TaskType } = require("@google/generative-ai");

async function processDocuments(path) {
    try {
        let loader;
        const assestID = path.match(/[^\\]+[* a-z]$/)[0];
        if (/\.pdf$/i.test(path)) {
            loader = new PDFLoader(path);
        } else if (/\.json$/i.test(path)) {
            loader = new JSONLoader(path, "/texts");
        } else if (/\.jsonl$/i.test(path)) {
            loader = new JSONLinesLoader(path, "/html");
        } else if (/\.txt$/i.test(path)) {
            loader = new TextLoader(path);
        } else if (/\.csv$/i.test(path)) {
            loader = new CSVLoader(path, "text");
        } else {
            throw new Error('Unsupported file type');
        }

        const docs = await loader.load();

        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 100,
        });

        const splits = await textSplitter.splitDocuments(docs);
        const embeddings = new GoogleGenerativeAIEmbeddings({
            model: "text-embedding-004", // 768 dimensions
            taskType: TaskType.RETRIEVAL_DOCUMENT,
            title: assestID,
        });
        console.log("Embeddings => ", embeddings);
        const vectorStore = await MemoryVectorStore.fromDocuments(
            splits,
            embeddings
        );
        console.log("Vector store => ", vectorStore.memoryVectors?.[0], vectorStore.memoryVectors?.[0].embeddings, vectorStore.memoryVectors?.[0].metadata);
        return vectorStore;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { processDocuments };