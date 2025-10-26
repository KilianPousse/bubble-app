import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.route.js'
import msgRoutes from './routes/msg.route.js'
import { connectDB } from './lib/db.js';
import { ENV } from './lib/env.js';

const app = express();
const __dirname = path.resolve();

const PORT = ENV.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
}));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/msg", msgRoutes);

if(ENV.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../fontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Bubble Server running on port ${PORT}`)
    connectDB();
});