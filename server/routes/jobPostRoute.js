const express = require("express");
const {
  newJobPost,
  paymentCallback,
  getJobPosts,
  getSelectedPost,
  getApplicants,
} = require("../controllers/jobPostController");

const router = express.Router();

router.post("/postjob/:id", newJobPost);

router.get("/payment-callback", paymentCallback);

router.get("/get-job-posts", getJobPosts);

router.get("/get-selected-post/:id", getSelectedPost);

router.get("/get-applicants/:id", getApplicants);

module.exports = router;
