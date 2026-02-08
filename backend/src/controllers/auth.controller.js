import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../lib/env.js";

//signup
export const signup = async (req, res) => {
  const { email, fullName, password } = req.body;
  const name = typeof fullName === "string" ? fullName.trim() : "";
  const normalizedEmail =
    typeof email === "string" ? email.trim().toLowerCase() : "";
  const pass = typeof password === "string" ? password : "";

  try {
    if (!normalizedEmail || !name || !pass) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (pass.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 character" });
    }

    // check if emails valid : regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    //check if user exists
    const user = await User.findOne({ email: normalizedEmail });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(pass, salt);

    //create new user
    const newUser = new User({
      fullName: name,
      email: normalizedEmail,
      password: hashPassword,
    });

    //check if user
    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(savedUser.id, res);
      res.status(201).json({
        _id: savedUser._id,
        fullName: savedUser.fullName,
        email: savedUser.email,
        profilePic: savedUser.profilePic,
      });

      //Send welcome email to client
      try {
        const clientURL = ENV.CLIENT_URL;
        await sendWelcomeEmail(savedUser.fullName, savedUser.email, clientURL);
      } catch (error) {
        console.log("Failed to send welcome email", error);
      }
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credential!" });

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword)
      return res.status(400).json({ message: "Invalid Credential!" });

    generateToken(user.id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

// logout
export const logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out succesfully" });
};
