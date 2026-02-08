import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  login,
  logout,
  signup,
  updateProfilePic,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup, (req, res) => {});
router.post("/login", login, (req, res) => {});
router.post("/logout", logout, (req, res) => {});
router.put("/update-profile", protectRoute, updateProfilePic, (req, res) => {});
router.get("/check", protectRoute, (req, res) => {
  res.status(200).json(req.user);
});
export default router;
