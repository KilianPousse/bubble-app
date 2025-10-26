import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Checking mandatory fields
    if(!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Password strength check
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if(!passwordRegex.test(password)) {
        return res.status(400).json({ message: "Password must be at least 8 characters long, contain one uppercase letter and one special character" });
    }

    // Checking the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    // Checks if a user already exists with the same email or username
    const existingUser = await User.findOne({
        $or: [{ email }, { username }],
    });

    if (existingUser) {
        if(existingUser.email === email) {
            return res.status(400).json({ message: "Email already in use" });
        }
        if(existingUser.username === username) {
            return res.status(400).json({ message: "username already in use" });
        }
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating the user
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });

    if(newUser) {
        const savedUser = await newUser.save();
        generateToken(savedUser._id, res);

        return res.status(201).json({ 
            message: "User created successfully", user: {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email
        } });
    }
    else {
        console.error(`Error in signup controller : ${error}`);
        res.status(500).json({ message: "Server error" });
    }

    
  }
  catch(error) {
    console.error("Signup error:", error);
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
        res.status(200).json({ 
            message: "Login successful", user: {
            _id: user._id,
            username: user.username,
            email: user.email
        } });
    } 
    catch(error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const logout = async (req, res) => {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout successful" });
};

export const updateProfile = async (req, res) => {
    // TODO: Implement profile update logic
};