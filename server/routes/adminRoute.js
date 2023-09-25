const express = require("express");
const router = express.Router();

const {
  adminLogin,
  adminGetUsers,
  getReports,
  deleteReportedPost,
  deleteUser,
  blockUser,
  unBlockUser,
  newAdmin,
  deleteAdmin,
  adminrefresh,
  adminLogOut,
} = require("../controllers/adminController");

router.post("/new-admin", newAdmin);

router.post("/admin-login", adminLogin);

router.post("/api/arefresh", adminrefresh);

router.post("/admin/logout", adminLogOut);

router.post("/delete-admin", deleteAdmin);

router.delete("/admin-delete-user/:id", deleteUser);

router.patch("/admin-block-user/:id", blockUser);

router.patch("/admin-unblock-user/:id", unBlockUser);

router.get("/admin-get-users", adminGetUsers);

router.get("/get-reports", getReports);

router.delete("/delete-reported/:reportId/:id", deleteReportedPost);

module.exports = router;
