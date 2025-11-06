import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";
import { io, getReceiverSocketId } from "../lib/socket.js";

export const getFriendsList = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate("friends", "-password");

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const receiverRequests = await FriendRequest.find({ receiverId: user._id })
            .populate("senderId", "tag username avatar");
        const friendRequests = receiverRequests.map(req => req.senderId);

        const sentRequestsRaw = await FriendRequest.find({ senderId: user._id })
            .populate("receiverId", "tag username avatar");
        const sentRequests = sentRequestsRaw.map(req => req.receiverId);

        res.status(200).json({
            friends: user.friends || [],
            friendRequests,
            sentRequests,
        });
    } 
    catch (error) {
        console.error("Error in getFriendsList controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};


export const removeFriend = async (req, res) => {
    try {
        const user = req.user;
        const { id: friendId } = req.params;

        const friend = await User.findById(friendId);
        if(!friend) {
            return res.status(404).json({ message: "User not found" });
        }

        if(!user.friends.includes(friendId)) {
            return res.status(400).json({ message: `@${friend.tag} is not your friend` });
        }

        await User.findByIdAndUpdate(user._id, {
            $pull: { friends: friendId },
        });
        await User.findByIdAndUpdate(friendId, {
            $pull: { friends: user._id },
        });

        // Socket.io
        const receiverSocketId = getReceiverSocketId(friendId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("friendRemoved", { userId: user._id });
        }

        return res.status(200).json({ message: "Friend successfully removed" });
    } 
    catch(error) {
        console.error("Error in deleteFriend controller:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const sendFriendRequest = async (req, res) => {
    try {
        const user = req.user;
        const { id: friendId } = req.params;
        
        if(user._id.equals(friendId)) {
            return res.status(400).json({ message: "You cannot send a request to yourself" });
        }

        const friend = await User.findById(friendId);
        if(!friend) {
            return res.status(404).json({ message: "User not found" });
        }

        if(user.friends.includes(friendId)) {
            return res.status(400).json({ message: "Already friends" });
        }

        const existing = await FriendRequest.findOne({
            $or: [
                { senderId: user._id, receiverId: friendId },
                { senderId: friendId, receiverId: user._id },
            ],
        });

        if(existing) {
            return res.status(400).json({ message: "Friend request already exists" });
        }

        const request = await FriendRequest.create({ senderId: user._id, receiverId: friendId });

        // Socket.io
        const receiverSocketId = getReceiverSocketId(friendId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("friendRequestReceived", {
                senderId: user._id,
                receiverId: friendId,
            });
        }

        res.status(200).json({ message: "Friend request sent", request });
    }
    catch(error) {
        console.error(error);
        res.status(500).json({ message: `Server error (${error})` });
    }
};

export const acceptFriendRequest = async (req, res) => {
    try {
        const receiverId = req.user._id;
        const { id: senderId } = req.params;

        const request = await FriendRequest.findOne({ senderId, receiverId });
        if(!request) {
            return res.status(400).json({ message: "No friend request from this user" });
        }

        await FriendRequest.findByIdAndDelete(request._id);

        await User.findByIdAndUpdate(receiverId, {
            $addToSet: { friends: senderId },
        });
        await User.findByIdAndUpdate(senderId, {
            $addToSet: { friends: receiverId },
        });

        // Socket.io
        const senderSocketId = getReceiverSocketId(senderId);
        const receiverSocketId = getReceiverSocketId(receiverId);

        if(senderSocketId) {
            io.to(senderSocketId).emit("friendRequestAccepted", {
                friendId: receiverId,
            });
        }
        
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("friendRequestAccepted", {
                friendId: senderId,
            });
        }

        res.status(200).json({ message: "Friend request accepted" });
    }
    catch(error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const rejectFriendRequest = async (req, res) => {
    try {
        const receiverId = req.user;
        const { id: senderId } = req.params;

        const request = await FriendRequest.findOne({ senderId, receiverId });
        if(!request) {
            return res.status(400).json({ message: "No friend request from this user" });
        }

        await FriendRequest.findByIdAndDelete(request._id);

        const senderSocketId = getReceiverSocketId(senderId);
        if(senderSocketId) {
            io.to(senderSocketId).emit("friendRequestRejected", { receiverId });
        }

        res.status(200).json({ message: "Friend request rejected" });
    }
    catch(error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

