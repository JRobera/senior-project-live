const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  signInGoogle,
  signUp,
  logIn,
  refresh,
  logOut,
  getUsers,
  getUserByEmail,
  editUserProfile,
  getUserProfile,
  changeProfile,
  changeCover,
  follow,
  unfollow,
  getNewNetwork,
  getUsersFs,
  deleteExp,
  deleteEdu,
  deleteCer,
  uploadResume,
} = require("../controllers/jobSeekerController.js");

// Sign in with google
router.post("/google-sign-in", signInGoogle);

// Sign up user
router.post("/sign-up", signUp);

// Log the user in
router.post("/user/login", logIn);

// Refresh user accesstoken
router.post("/api/refresh", refresh);

// Logout user
router.post("/user/logout", logOut);

// Find users deffrent from current user
router.get("/get-users/:email", getUsers);

// get user data to display on right bar
router.get("/get-user-by-email/:email", getUserByEmail);

// update users profile data
router.post("/edit-profile/:id", editUserProfile);

//
router.delete("/delete-exp/:id", deleteExp);

//
router.delete("/delete-edu/:id", deleteEdu);

//
router.delete("/delete-cer/:id", deleteCer);

// get all info about user
router.get("/get-user-profile/:id", getUserProfile);

// change user profile image
router.put("/change-profile/:id", upload.single("profileImage"), changeProfile);

// change user profile background
router.put("/change-cover/:id", upload.single("coverImage"), changeCover);

//
router.patch("/follow/user", follow);

//
router.patch("/unfollow/user", unfollow);

// new user to follow
router.get("/get/new/network/:id", getNewNetwork);

// get user followrs and followings
router.get("/ff/:userId", getUsersFs);

router.post(
  "/upload/resume/:jobid/:userid",
  upload.single("Resume"),
  uploadResume
);

module.exports = router;
