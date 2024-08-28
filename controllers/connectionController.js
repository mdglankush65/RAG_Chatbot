const { createRagChain } = require('../utils/createRagChain');
const state = require('../utils/state');

async function connect(req, res) {
    try {
        const response = await createRagChain(state.retriever);
        state.ragChain = response;
        res.json({ success: true, "ragChain": response });
    } catch (error) {
        res.status(500).send({ error: 'Connection failed.' });
    }
}

module.exports = { connect };