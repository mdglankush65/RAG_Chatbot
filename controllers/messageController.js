const state = require('../utils/state');

async function getResult(req, res) {
    try {
        if (!state.ragChain) {
            console.log("RAG Chain not initialized.");
            return res.status(500).send({ error: 'RAG Chain not initialized.' });
        }
        const { question } = req.body;
        console.log("This is our question => ", question);

        const result = await state.ragChain.invoke({ input: question });
        console.log("Invocation result:", result);

        res.send(result.answer);
    } catch (error) {
        console.error("Failed to get result:", error.message, error.stack);
        res.status(500).send({ error: 'Failed to get result.' });
    }
}

async function getHistory(req, res) {
    try {
        if (!state.ragChain) {
            console.log("RAG Chain not initialized.");
            return res.status(500).send({ error: 'RAG Chain not initialized.' });
        }
        const { question } = req.body;
        console.log("This is our question for history => ", question);

        const result = await state.ragChain.invoke({ input: question });
        console.log("Invocation history result:", result);

        res.send(result.chat_history);
    } catch (error) {
        console.error("Failed to get history:", error.message, error.stack);
        res.status(500).send({ error: 'Failed to get history.' });
    }
}

module.exports = { getResult, getHistory };