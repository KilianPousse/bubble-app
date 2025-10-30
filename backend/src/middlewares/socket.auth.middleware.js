import jwt from "jsonwebtoken";
import User from "../models/User.js"
import { ENV } from "../lib/env.js"

export const socketAuthMiddlesware = async (socket, next) => {
    try {
        const token = socket.handshake.headers.cookie
            ?.split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

        if(!token) {
            console.error("Socket connection rejected: No token provided");
            return next(new Error("Unauthorized: No token provided"));
        }

        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        if(!decoded) {
            console.error("Socket connection rejected: Invalid token");
            return next(new Error("Unauthorized: Invalid token"));
        }

        const user = await User.findById(decoded.userId).select("-password");
        if(!user) {
            console.error("Socket connection rejected: User not found");
            return next(new Error("Unauthorized: User not found"));
        }

        socket.user = user;
        socket.userId = user._id.toString();

        console.log(`Socket authenticated for user: @${user.tag} (${user._id})`);

        next();
    } 
    catch(error) {
        console.error("Socket connection rejected:", error.message);
        return next(new Error("Unauthorized: Authentication failed"));
    }
};