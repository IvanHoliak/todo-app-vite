import express, { Express, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";

import { CONFIG } from "./config";
import _router from "./router";
import { StartServer } from "./types";

const app: Express = express();
const PORT = CONFIG.PORT || 3333;

app.use(express.static(path.join(__dirname, "../../client/dist")));

app.use(express.json());
app.use(cookieParser())
app.use(cors())

app.use('/api', _router);

app.get("/", (req: Request, res: Response) => {
    // res.send("⚡️ Express + TypeScript Server");
    res.sendFile(path.join(__dirname, "../../client/dist", "index.html"));
});


const start: StartServer = () => {
    try{
        mongoose.connect(CONFIG.DB_URL, () => {
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
