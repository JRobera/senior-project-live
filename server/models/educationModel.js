const mongoose = require("mongoose");

const EducationSchema = mongoose.Schema({
  School: { type: String, required: true },
  Duration: { type: String, required: true },
  Description: { type: String, required: true },
  User_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

module.exports = Education = mongoose.model("educations", EducationSchema);
