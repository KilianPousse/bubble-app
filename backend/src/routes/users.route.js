import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { arcjetProtection } from '../middlewares/arcjet.middleware.js';
import {
    searchUsers,
} from '../controllers/users.controller.js';

const router = express.Router();

router.use(arcjetProtection, protectRoute);

router.get("/search", searchUsers);

export default router;