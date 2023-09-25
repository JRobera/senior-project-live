const mongoose = require("mongoose");

const ExperienceSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Company: { type: String, required: true },
  Description: { type: String, required: true },
  Duration: { type: String, required: true },
  User_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

module.exports = Experience = mongoose.model("experiences", ExperienceSchema);
