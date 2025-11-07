import jwt from 'jsonwebtoken';
import { ENV } from './env.js';

import User from '../models/User.js';

export const generateToken = (userId, res) => {
    const { JWT_SECRET } = ENV;
    if(!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign({ id: userId, userId }, JWT_SECRET, {
        expiresIn: '7d',
    });

    res.cookie('token', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'development' ? false : true,
    });

    return token;
};

export const createJsonUserResponse = (message, user) => {
    const userObj = user.toObject ? user.toObject() : user;
    delete userObj.password;
    return {
        message,
        user: userObj,
    };
};
