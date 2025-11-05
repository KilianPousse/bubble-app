import User from "../models/User.js";

import { clearFriendRequests } from "../lib/utils.js";

export const getFriendsList = async (req, res) => {
    try {
    const user = await User.findById(req.user._id)
        .populate("friends", "-password")
        .populate("friendRequests", "-password")
        .populate("sentRequests", "-password");

    if(!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
        friends: user.friends,
        friendRequests: user.friendRequests,
        sentRequests: user.sentRequests,
    });
    } 
    catch(error) {
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

        user.friends = user.friends.filter(f => f.toString() !== friendId);
        friend.friends = friend.friends.filter(f => f.toString() !== user._id.toString());

        await user.save();
        await friend.save();

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

        if(friend.friendRequests.includes(user._id)) {
            return res.status(400).json({ message: "Friend request already sent" });
        }

        await User.findByIdAndUpdate(friendId, { $addToSet: { friendRequests: user._id } });
        await User.findByIdAndUpdate(user._id, { $addToSet: { sentRequests: friendId} });

        res.status(200).json({ message: "Friend request sent" });
    }
    catch(error) {
        console.error(error);
        res.status(500).json({ message: `Server error (${error})` });
    }
};

export const acceptFriendRequest = async (req, res) => {
    try {
        const user = req.user;
        const { id: requesterId } = req.params;

        if(!user.friendRequests.includes(requesterId)) {
            return res.status(400).json({ message: "No friend request from this user" });
        }

        await clearFriendRequests(user._id, requesterId);

        await User.findByIdAndUpdate(user._id, {
            $addToSet: { friends: requesterId },
        });
        await User.findByIdAndUpdate(requesterId, {
            $addToSet: { friends: user._id },
        });

        res.status(200).json({ message: "Friend request accepted" });
    }
    catch(error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const rejectFriendRequest = async (req, res) => {
    try {
        const user = req.user;
        const { id: requesterId } = req.params;

        await clearFriendRequests(user._id, requesterId);

        res.status(200).json({ message: "Friend request rejected" });
    }
    catch(error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

