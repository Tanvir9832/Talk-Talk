const express = require("express");
const { auth } = require("../../middleware/auth");
const {
  createGroupChat,
  accessChat,
  getChats,
  renameGroup,
  removeFromGroup,
  addToGroup,
} = require("../../controllers/chatController/chat.controller");
const chatRoute = express.Router();

chatRoute.route("/").post(auth, accessChat).get(auth, getChats);

chatRoute.route("/group/chat/create").post(auth, createGroupChat);

chatRoute.route("/rename/group").put(auth, renameGroup);

 chatRoute.route("/remove/from/group").put(auth, removeFromGroup);

chatRoute.route("/add/to/group").patch(auth, addToGroup);

module.exports = {
  chatRoute,
};
