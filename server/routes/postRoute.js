const express = require("express");
const router = express.Router();
const varifyJWT = require("../middleware/jwtVarify");
const upload = require("../middleware/upload");
const {
  newTextPost,
  newPhotoPost,
  newVideoPost,
  getPosts,
  getUserPost,
  deleteUserpost,
  editUserPost,
  reportPost,
} = require("../controllers/postController");

router.post("/new/text-post/:id", varifyJWT, newTextPost);

router.post(
  "/new/photo-post/:id",
  varifyJWT,
  upload.single("postImage"),
  newPhotoPost
);

// Add new vedio post to DB
router.post(
  "/new/video-post/:id",
  varifyJWT,
  upload.single("postVideo"),
  newVideoPost
);

// Get posts
router.get("/get/posts", getPosts);

// Return post which belong to current user
router.get("/post/:id", getUserPost);

router.delete("/delete/post/:postid/:userid", deleteUserpost);

router.post("/report/post/:id", reportPost);

router.patch("/edit/post", editUserPost);

module.exports = router;
