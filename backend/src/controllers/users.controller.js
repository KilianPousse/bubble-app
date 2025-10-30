import User from "../models/User.js";

export const searchUsers = async (req, res) => {
    const { query } = req.query;
    const users = await User.find({
        $or: [
            { username: { $regex: query, $options: "i" } },
            { tag: { $regex: query, $options: "i" } },
        ]
    }).select("-password").limit(20);
    
    res.json(users);
};