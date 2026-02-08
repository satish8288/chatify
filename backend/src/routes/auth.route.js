import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup, (req, res) => {});
router.post("/login", login, (req, res) => {});
router.post("/logout", logout, (req, res) => {});

export default router;
