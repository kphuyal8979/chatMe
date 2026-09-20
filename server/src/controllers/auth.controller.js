import { generateToken } from "../lib/utils.js";
import User from "../model/User.js";
import bcrypt from "bcryptjs";
import "dotenv/config";
import { sendWelcomeEmail } from "../emails/emailHandler.js";
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields required",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        mesage: "Password must be at least 6 character",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      await newUser.save();
      generateToken(newUser._id, res);
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({
        message: "Invalid user data",
      });
    }

    try {
      await sendWelcomeEmail(
        newUser.email,
        newUser.fullName,
        process.env.CLIENT_URL,
      );
    } catch (error) {
      console.error("failed sending welcome email:", error);
    }
  } catch (error) {
    console.log(`Error in signup controller`, error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credential" });
    }
    generateToken(user._id, res);
    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error(`Error in login controller ${error}`);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({
    message: "Logout Success",
  });
};
