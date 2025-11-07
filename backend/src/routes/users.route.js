import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { arcjetProtection } from '../middlewares/arcjet.middleware.js';
import {
    getUser,
    searchUsers,
    getAllOnlineUsers,
} from '../controllers/users.controller.js';

const router = express.Router();

router.use(arcjetProtection, protectRoute);

router.get("/get/:id", getUser);
router.get("/search", searchUsers);
router.get("/online", getAllOnlineUsers);


export default router;