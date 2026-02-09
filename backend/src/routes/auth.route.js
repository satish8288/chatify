import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  login,
  logout,
  signup,
  updateProfilePic,
} from "../controllers/auth.controller.js";
import rateLimiter from "../middlewares/arcjet.middleware.js";

const router = express.Router();

router.use(rateLimiter);

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfilePic);

router.get("/check", protectRoute, (req, res) => {
  res.status(200).json(req.user);
});

export default router;
