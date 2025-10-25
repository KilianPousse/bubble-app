import express from 'express';

import { send } from '../controllers/msg.controller.js';

const router = express.Router();

router.get("/send", send);

export default router;