const express = require("express");
const {
  loginUser,
  registerUser,
  forgotPassword,
  updateUser,
  getUserById,
} = require("../Controllers/userController");
const requireSignIn = require("../Middlewares/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.get("/:userId", getUserById);
// router.put("/update", updateUser);
router.put("/:userId", requireSignIn, updateUser);

module.exports = router;
