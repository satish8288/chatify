// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/auth", messageRoutes);

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
