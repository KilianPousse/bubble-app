import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    tag: { 
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 24
    },
    username: {
        type: String,
        default: "",
        required: false,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 64
    },
    profilePicture: {
        type: String,
        default: ""
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;