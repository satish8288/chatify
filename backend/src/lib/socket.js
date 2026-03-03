import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middlewares/socket.auth.middleware.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [ENV.CLIENT_URL],
    credentials: true,
  },
});

io.use(socketAuthMiddleware);

const socketUserMap = {}; //userId:socket.id

io.on("connection", (socket) => {
  console.log("A user connected: ", socket.user.fullName);

  const userId = socket.userId;
  socketUserMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(socketUserMap));

  socket.on("disconnect", () => {
    console.log("A user disconnect: ", socket.user.fullName);
    delete socketUserMap[userId];
    io.emit("getOnlineUsers", Object.keys(socketUserMap));
  });
});

export { app, io, server };
