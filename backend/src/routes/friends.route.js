import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { arcjetProtection } from '../middlewares/arcjet.middleware.js';

import {
    getFriendsList,
    addFriend,
    deleteFriend,
} from '../controllers/friends.controller.js'

const router = express.Router();

router.use(arcjetProtection, protectRoute);

router.get("/list", getFriendsList);
router.post("/add/:id", addFriend);
router.delete("/delete/:id", deleteFriend);

export default router;