const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  Message_id: { type: String, unique: true },
  Message_content: [
    {
      author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      message: String,
      time: String,
    },
  ],
});

module.exports = Message = mongoose.model("messages", MessageSchema);
