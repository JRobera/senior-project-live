const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  Text: { type: String, required: true },
  Total_likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  Comment_reply: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
  User_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

module.exports = Comment = mongoose.model("comments", CommentSchema);
