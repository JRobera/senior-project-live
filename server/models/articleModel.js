const mongoose = require("mongoose");

const ArticleSchema = mongoose.Schema({
  Article_title: { type: String },
  Article_content: { type: String },
  Total_like: { type: String },
  User_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

module.exports = Article = mongoose.model("articles", ArticleSchema);
