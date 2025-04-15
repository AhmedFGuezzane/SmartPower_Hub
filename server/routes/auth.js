const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");

// === REGISTER ===
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // 1. Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // 2. Create and save new user (password gets hashed automatically)
    const newUser = new User({ name, email, password, role });
    await newUser.save();

    res.status(201).json({ message: "Account created!" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// === LOGIN ===
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // 1. Validate inputs
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
      }
  
      // 2. Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials." });
      }
  
      // 3. Compare passwords
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: "Incorrect password." });
      }
  
      // 4. Respond with user info
      res.status(200).json({
        message: `✅ Welcome back, ${user.name}! Login successful.`,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
  
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ message: "Server error during login." });
    }
});
  

module.exports = router;
