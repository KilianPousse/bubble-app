import User from "../models/User.js";

export const getFriendsList = async (req, res) => {
    try {
        const friendIds = req.user.friends;

        if(!friendIds || friendIds.length === 0) {
        return res.status(200).json([]);
        }

        const friends = await User.find({ _id: { $in: friendIds } }).select("-password");

        return res.status(200).json(friends);
    } 
    catch(error) {
        console.error("Error in getFriendsList controller:", error);
        return res.status(500).json({ message: "Server error" });
    }
};


export const addFriend = async (req, res) => {
    try {
        const user = req.user;
        const { id: friendId } = req.params;

        const friend = await User.findById(friendId);
        if(!friend) {
        return res.status(404).json({ message: "User not found" });
        }

        if(user.friends.includes(friendId)) {
        return res.status(400).json({ message: `@${friend.tag} is already your friend` });
        }

        user.friends.push(friendId);
        friend.friends.push(user._id);

        await user.save();
        await friend.save();

        return res.status(200).json({ message: "Friend successfully added" });
    } 
    catch(error) {
        console.error("Error in addFriend controller:", error);
        return res.status(500).json({ message: "Server error" });
    }
};


export const deleteFriend = async (req, res) => {
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
