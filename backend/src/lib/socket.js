import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.js"
import { socketAuthMiddlesware } from "../middlewares/socket.auth.middleware.js";

const app = express();
const server = http.createServer();

const io = new Server(server, {
    cors: {
        origin: [ENV.CLIENT_URL],
        credentials: true,
    },
});

io.use(socketAuthMiddlesware);

const userSocketMap = {};

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

io.on("connection", (socket) => {
    console.log(`User @${socket.user.tag} connected`);

    const userId = socket.userId;
    userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log(`User @${socket.user.tag} deconnected`);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { io, app, server };