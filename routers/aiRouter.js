const express = require('express');
const { summaryController, codeController, imageReaderController, getAllChatController } = require('../controllers/aiController');

const aiRouter = express.Router();

aiRouter.post('/summary',summaryController);
aiRouter.post('/code',codeController);

module.exports = aiRouter;