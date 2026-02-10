import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  getAllContacts,
  sendMessage,
  getMessageByUserId,
  getChatPartners,
} from "../controllers/message.controller.js";

const router = express.Router();
router.use(protectRoute);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessageByUserId);
router.post("/send/:id", sendMessage);

export default router;
