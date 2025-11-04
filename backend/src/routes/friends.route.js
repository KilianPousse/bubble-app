import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { arcjetProtection } from '../middlewares/arcjet.middleware.js';

import {
    getFriendsList,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    deleteFriend,
} from '../controllers/friends.controller.js'

const router = express.Router();

router.use(arcjetProtection, protectRoute);

router.get("/list", getFriendsList);
router.post("/request/:id", sendFriendRequest);
router.post("/accept/:id", acceptFriendRequest);
router.post("/reject/:id", rejectFriendRequest);
router.delete("/delete/:id", deleteFriend);

export default router;