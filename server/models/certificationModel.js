const mongoose = require("mongoose");

const CertificationSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Duration: { type: String },
  Description: { type: String },
  User_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

module.exports = Certification = mongoose.model(
  "certifications",
  CertificationSchema
);
