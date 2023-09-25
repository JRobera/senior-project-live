const mongoose = require("mongoose");

const SkillSchema = mongoose.Schema({
  Skill_name: [{ type: String, required: true }],
  User_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

module.exports = Skill = mongoose.model("skills", SkillSchema);
