const express = require('express');
require('dotenv').config();
const chatRoutes = require('./routes/chatRoutes');
const documentRoutes = require('./routes/documentRoutes');

const app = express();
app.use(express.json());

app.use('/api/chat', chatRoutes);
app.use('/api/documents', documentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("RAG Chatbot is available on port ", PORT);
})