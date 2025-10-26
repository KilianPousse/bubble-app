import express from 'express';

import { signup, login, logout } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/check", protectRoute, (req, res) => {
    res.status(200).json({ message: "User is authenticated", user: req.user });
});

export default router;