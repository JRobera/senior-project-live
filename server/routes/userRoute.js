const express = require("express");
const router = express.Router();

const {
  sendPasswordResetEmail,
  verifyResetPasswordLink,
  setNewPassword,
} = require("../controllers/userController");

//
router.post("/forgot-password", sendPasswordResetEmail);

//
router.get("/reset-password/:token/:id", verifyResetPasswordLink);

//
router.post("/reset-password/:token/:id", setNewPassword);

module.exports = router;
