import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import { io, getReceiverSocketId } from "../lib/socket.js";

export const getAllContacts = async (req, res) => {
    try {
        const loggedUserId = req.User._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedUserId } }).select("-password");

        res.status(200).json(filteredUsers);
    } 
    catch(error) {
        console.error("Error in get all contacts controller:", error);
        res.status(500).json({ message: "Server error" })
    }
};

export const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const { id: userToChatId } = req.params;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        });

        res.status(200).json(messages);
    } 
    catch(error) {
        console.error("Error in get messages controller:", error.message);
        res.status(500).json({ error: "Internal server error" })
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { content, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        if(!content && !image) {
            return res.status(400).json({ message: "Content is required." });
        }

        if(senderId.equals(receiverId)) {
            return res.status(400).json({ message: "Cannot send message to yourself." });
        }

        const receiverExists = await User.exists({ _id: receiverId });
        if(!receiverExists) {
            return res.status(404).json({ message: "Receiver not found." });
        }

        let imageUrl;
        if(image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            content,
            image: imageUrl,
        });

        await newMessage.save();

        // Socket.io
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } 
    catch(error) {
        console.error("Error in send message controller:", error.message);
        res.status(500).json({ error: "Internal server error" })
    }
};

export const getChatPartners = async (req, res) => {
    try {
        const loggedUserId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: loggedUserId },
                { receiverId: loggedUserId },
            ],
        });

        const chatPartnerIds = [
            ...new Set(
                messages.map((msg) =>
                    msg.senderId.toString() == loggedUserId.toString()
                        ? msg.receiverId.toString()
                        : msg.senderId.toString()
                )
            ),
        ];

        const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select("-password");

        res.status(200).json(chatPartners);
    } 
    catch(error) {
        console.error("Error in get chat partners controller:", error.message);
        res.status(500).json({ error: "Internal server error" })
    }
};