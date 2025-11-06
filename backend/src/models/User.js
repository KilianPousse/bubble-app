import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    tag: { 
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 24,
    },
    username: {
        type: String,
        default: "",
        required: false,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 64,
    },
    avatar: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "",
        maxlength: 256,
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;