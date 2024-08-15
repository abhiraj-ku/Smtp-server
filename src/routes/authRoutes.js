const express = require("express");
const {
  registerUser,
  authenticateUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/authenticate", authenticateUser);

module.exports = router;
