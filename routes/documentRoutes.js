const express = require('express');
const { processDoc } = require('../controllers/processDocsController');

const router = express.Router();

router.post('/process', processDoc);

module.exports = router;