import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import { createJsonResponse, generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { tag, email, password } = req.body;

    try {
        // Checking mandatory fields
        if(!tag || !email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }

        // Tag validation: lowercase letters, digits, underscore, 3-24 chars
        const tagRegex = /^[a-z0-9_]{3,24}$/;
        if(!tagRegex.test(tag)){
            return res.status(400).json({ message: "Tag must be 3-24 characters long and contain only lowercase letters, numbers, or underscore" });
        }

        // Password strength check
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
        if(!passwordRegex.test(password)){
            return res.status(400).json({ message: "Password must be at least 8 characters long, contain one uppercase letter and one special character" });
        }

        // Checking the email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Checks if a user already exists with the same email or tag
        const existingUser = await User.findOne({
            $or: [{ email }, { tag }]
        });

        if(existingUser){
            if(existingUser.email === email){
                return res.status(400).json({ message: "Email already in use" });
            }
            if(existingUser.tag === tag){
                return res.status(400).json({ message: "Tag already in use" });
            }
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating the user
        const newUser = new User({
            tag,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        generateToken(savedUser._id, res);

        return res.status(201).json(createJsonResponse("User created successfully", savedUser));
    }
    catch(error){
        console.error("Signup error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Checking mandatory fields
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Comparing passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        generateToken(user._id, res);
        res.status(200).json(createJsonResponse("Login successful", user));
    } 
    catch(error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const logout = async (_, res) => {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout successful" });
};

export const updateProfile = async (req, res) => {
    try {
        const { username, avatar, password, bio } = req.body;

        if(username == null && avatar == null && !password && bio == null) {
            return res.status(400).json({ message: "Nothing to update"});
        }

        const userId = req.user._id;
        if(!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const updateFields = {};

        // Username update + validation
        if(username != null) {
            if(username.length > 64) {
                return res.status(400).json({ message: "Name must not exceed 64 characters" });
            }
            updateFields.username = username;
        }

        // Avatar update
        if(avatar != null) {
            if(avatar === "") {
                updateFields.avatar = "";
            }
            else {
                const uploadAvatar = await cloudinary.uploader.upload(avatar);
                updateFields.avatar = uploadAvatar.secure_url;
            }
        }

        // Password update + validation + hashing
        if(password) {
            const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,64}$/;
            if(!passwordRegex.test(password)) {
                return res.status(400).json({ message: "Password must be at least 8 characters long, contain one uppercase letter and one special character" });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateFields.password = hashedPassword;
        }

        // Bio update + validate
        if(bio != null) {
            if(bio.length > 256) {
                return res.status(400).json({ message: "Bio must not exceed 256 characters" });
            }
            updateFields.bio = bio;
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true }).select('-password');

        if(!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(createJsonResponse("Profile updated successfully", updatedUser));
    } catch (error) {
        console.error("Error in update profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};