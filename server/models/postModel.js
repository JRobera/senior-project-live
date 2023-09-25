const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  postUrl: { type: String },
  postId: { type: String },
  postFormat: { type: String },
  Post_description: { type: String },
  Total_like: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  Comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
  User_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

module.exports = Post = mongoose.model("posts", PostSchema);
