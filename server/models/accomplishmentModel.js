const mongoose = require("mongoose");

const AccomplishmentSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Date: { type: String, required: true },
  Description: { type: String },
  User_id: { type: mongoose.Schema.Types.ObjectId, ref: "jobseekers" },
});

module.exports = Accomplishment = mongoose.model(
  "accomplishments",
  AccomplishmentSchema
);
