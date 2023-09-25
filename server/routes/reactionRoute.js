const express = require("express");
const router = express.Router();

const {
  likePost,
  addComment,
  addCommentReply,
  getComments,
  getCommentReply,
  sharePost,
} = require("../controllers/reactionController");

// Reactions
router.patch("/like/post/:post_id/:user_id", likePost);

// add comment to post
router.post("/add/comment", addComment);

// reply to comments
router.post("/add/comment/reply", addCommentReply);

// retrieve comments of post
router.get("/get/comments/:post_id", getComments);

// retrieve comment reply
router.get("/get/comment/reply/:comment_id", getCommentReply);

router.post("/share/post/:user_id/:id", sharePost);

module.exports = router;
