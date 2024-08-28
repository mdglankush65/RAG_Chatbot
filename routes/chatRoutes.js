const express = require('express');
const { connect } = require('../controllers/connectionController');
const { getResult, getHistory } = require('../controllers/messageController');

const router = express.Router();

router.post('/start', connect);
router.post('/message', getResult);
router.get('/history', getHistory);

module.exports = router;
