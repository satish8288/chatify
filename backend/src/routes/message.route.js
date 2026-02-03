import express from "express";

const router = express.Router();

router.get("/send", (req, res) => {
  res.send("Send message Endpoint");
});

router.get("/receive", (req, res) => {
  res.send("Receive message Endpoint");
});
export default router;
