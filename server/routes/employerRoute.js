const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  employerSignUp,
  employerLogIn,
  erefresh,
  elogOut,
  editEmpProfile,
  egetUserByEmail,
  getJobposts,
  deleteJobPost,
} = require("../controllers/employerController");

router.post("/sign-up/employer", employerSignUp);

router.post("/employer/login", employerLogIn);

router.post("/api/erefresh", erefresh);

router.post("/employer/logout", elogOut);

// update employer profile data
router.post("/edit-emp-profile/:id", editEmpProfile);

// get employer data to display on right bar
router.get("/get-employer-by-email/:email", egetUserByEmail);

router.get("/my-jobs/:id", getJobposts);

router.delete("/delete/job-post/:postid/:userid", deleteJobPost);

module.exports = router;
