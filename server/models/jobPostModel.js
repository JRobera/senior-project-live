const mongoose = require("mongoose");

const JobPostSchema = mongoose.Schema({
  Job_title: { type: String, required: true },
  Company_name: { type: String },
  Job_description: { type: String, required: true },
  Job_location: { type: String },
  Employment_type: { type: String },
  Work_type: { type: String },
  Skills: [String],
  Salary_range: { type: Number },
  Deadline: { type: String },
  Applicants: [
    {
      userid: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      resume: { type: String },
      jobPubId: { type: String },
    },
  ],
  Company_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

module.exports = JobPost = mongoose.model("jobposts", JobPostSchema);
