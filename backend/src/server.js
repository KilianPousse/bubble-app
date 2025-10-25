import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import authRoutes from './routes/auth.route.js'
import msgRoutes from './routes/msg.route.js'
import { connectDB } from './lib/db.js';

dotenv.config();

const app = express();
const __dirname = path.resolve();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/msg", msgRoutes);

if(process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../fontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Bubble Server running on port ${PORT}`)
    connectDB();
});