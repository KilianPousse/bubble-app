import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';

import { 
    signup, 
    login, 
    logout, 
    updateProfile,
    updateStatus,
} from '../controllers/auth.controller.js';
import { arcjetProtection } from '../middlewares/arcjet.middleware.js';

const router = express.Router();

router.use(arcjetProtection);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);
router.put("/status", protectRoute, updateStatus);

router.get("/check", protectRoute, (req, res) => res.status(200).json(
    {
        message: "User is authenticated",
        user: req.user,
    }
));

export default router;