const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  Name: { type: String },
  Password: { type: String },
  refreshToken: { type: String },
});

module.exports = Admin = mongoose.model("admins", AdminSchema);
