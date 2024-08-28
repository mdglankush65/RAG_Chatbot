// const { ChatOpenAI } = require("@langchain/openai");
const { createRetrievalChain } = require("langchain/chains/retrieval");
const { createStuffDocumentsChain } = require("langchain/chains/combine_documents");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { ChatGroq } = require("@langchain/groq");

async function createRagChain(retriever) {
    try {
        // const llm = new ChatOpenAI({
        //     model: "gpt-4o-mini",
        //     temperature: 0.5,
        // });

        const llm = new ChatGroq({
            model: "mixtral-8x7b-32768",
            temperature: 0
        });

        const systemTemplate = `You are an assistant for question-answering tasks. Use the following pieces of retrieved context to answer the question. If you don't know the answer, say that you don't know. Use three sentences maximum and keep the answer concise.\n\n{context}`;

        const prompt = ChatPromptTemplate.fromMessages([
            ["system", systemTemplate],
            ["human", "{input}"],
        ]);

        const questionAnswerChain = await createStuffDocumentsChain({ llm, prompt });

        console.log(retriever);
        const ragChain = await createRetrievalChain({
            retriever,
            combineDocsChain: questionAnswerChain,
        });

        console.log(ragChain + " I am with ragChain");
        return ragChain;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = { createRagChain };