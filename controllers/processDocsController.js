const { processDocuments } = require('../utils/processDocuments');
const state = require('../utils/state');

async function processDoc(req, res) {
    try {
        const vectorStore = await processDocuments(req.body.path);
        const retriever = await vectorStore.asRetriever();
        state.retriever = retriever;
        res.json({ success: true, retriever });
    } catch (error) {
        res.status(400).send({ "error": 'Failed to process document.' });
    }
}

module.exports = { processDoc };