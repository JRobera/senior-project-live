const express = require("express");
const {
  getMessage,
  getAllMessage,
  getChat,
  createRoom,
  updateChat,
  myChats,
} = require("../controllers/chatController");
const router = express.Router();

//
router.get("/my-chats/:user_id", myChats);

//
router.get("/get-message-id/:id", getMessage);

//
router.get("/get-all-message-id/:id", getAllMessage);

// Get messages which belong to "room"
router.get("/get-chat/:room", getChat);

// Create room number for chat
router.post("/create-room/:room", createRoom);

// Store new massage
router.put("/update-chat/:room", updateChat);

module.exports = router;
