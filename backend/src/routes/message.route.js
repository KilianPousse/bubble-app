import express from 'express';
import { 
    getMessagesByUserId,
    sendMessage,
} from '../controllers/message.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { arcjetProtection } from '../middlewares/arcjet.middleware.js';

const router = express.Router();

router.use(arcjetProtection, protectRoute);

router.get("/get/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage);

export default router;