const express = require("express");
const { loginUser, registerUser, forgotPassword, updateUser } = require("../Controllers/userController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.put("/update", updateUser);

module.exports = router;
