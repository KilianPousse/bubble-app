import User from "../models/User.js";

export const getUser = async (req, res) => {
    try {
        const { id: userId } = req.params;

        const user = await User.findById(userId)
            .select("-password -email"); 

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } 
    catch (error) {
        console.error("Error in getUser controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { tag: { $regex: query, $options: "i" } },
      ],
    })
      .select("-password")
      .limit(20);

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in searchUsers controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};
