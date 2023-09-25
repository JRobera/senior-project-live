const express = require("express");
const {
  searchByCategory,
  foundPost,
  foundArticle,
  foundUser,
  foundEmployer,
  foundJobPost,
} = require("../controllers/searchController");
const router = express.Router();

// Search api
router.get("/search/:cate/:query/:u_id", searchByCategory);

//
router.get("/found/post/:id", foundPost);

//
router.get("/found/article/:id", foundArticle);

//
router.get("/found/user/:id", foundUser);

//
router.get("/found/employer/:id", foundEmployer);

//
router.get("/found/job-post/:id", foundJobPost);

module.exports = router;
