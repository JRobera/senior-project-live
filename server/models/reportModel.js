const mongoose = require("mongoose");

const ReportSchema = mongoose.Schema({
  reportCount: { type: Number, default: 0 },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "posts" },
  report: [
    {
      report: { type: String },
    },
  ],
});

module.exports = Report = mongoose.model("reports", ReportSchema);
