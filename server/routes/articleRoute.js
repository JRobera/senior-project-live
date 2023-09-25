const express = require("express");
const router = express.Router();
const varifyJWT = require("../middleware/jwtVarify");

const {
  newArticle,
  usersArticle,
  latestArticle,
  deleteUserArticle,
} = require("../controllers/articleController");

// Add new article to DB
router.post("/new/article", varifyJWT, newArticle);

// Return articles which belong to current user
router.get("/article/:id", usersArticle);

router.get("/latest/article", latestArticle);

router.delete("/delete/article/:id/:userid", deleteUserArticle);

module.exports = router;
