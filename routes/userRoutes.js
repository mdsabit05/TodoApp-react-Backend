import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";

const router = express.Router();

const SECRET = "mysecret123";

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await sendEmail(
      email,
      "Welcome 🎉",
      `<h1>Welcome to Todo App</h1>
   <p>Your account created successfully</p>`,
    );

    await newUser.save();
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid username and password");
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).send("Invalid username and password");
    }

    const token = jwt.sign({ id: user._id }, SECRET);

    res.json({ token });
  } catch (err) {
    res.status(500).send("server error");
  }
});

export default router;
