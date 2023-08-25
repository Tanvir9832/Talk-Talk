const express = require("express");
const { auth } = require("../../middleware/auth");
const {sendMessage, allMessage} = require("../../controllers/messageController/message.controller");
const messageRouter = express.Router();


messageRouter.get("/:chatId",allMessage);
messageRouter.post("/",auth,sendMessage);

module.exports = {
    messageRouter,
    sendMessage
}