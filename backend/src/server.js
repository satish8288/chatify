// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();

const app = express();
const _dirname = path.resolve();

const PORT = process.env.PORT || 5000;

app.use(express.json()); //req.body
app.use("/api/auth", authRoutes);
app.use("/api/auth", messageRoutes);

//making ready for deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(_dirname, "../frontend", "dist", "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect DB:", error);
    process.exit(1); // 1 means fail and 0 means success
  }
};

startServer();
