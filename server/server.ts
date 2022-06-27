import express, { Express, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

import _router from "./router";
import { StartServer } from "./types";

const app: Express = express();

const PORT: number | string = process.env.PORT || 3333;
const DB_URL: string = process.env.DB_URL || "mongodb+srv://rockwell:rockwell__322@cloud.tggqp.mongodb.net/todo-vite?retryWrites=true&w=majority";

app.use(express.static(path.join(__dirname, "../../client/dist")));

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../client/dist", "index.html"));
});

app.use('/api', _router);

const start: StartServer = () => {
    try{
        mongoose.connect(DB_URL, () => {
            console.log(`🔥 🔥 🔥[mongoose]: Database connection successful.`);
        });
        app.listen(PORT, () => {
            console.log(`⚡️⚡️⚡️[server]: Server is running at http://localhost:${PORT}`);
        });
    }catch(e){
        console.log("💔 💔 💔 [error]: ", e);
    };
};

start();
