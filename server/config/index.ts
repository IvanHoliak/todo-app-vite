import dotenv from "dotenv";
import { ICONFIG, T_DB_URL, T_PORT } from "../types";

dotenv.config();

const PORT: T_PORT = process.env.PORT || 3333;
const DB_URL: T_DB_URL = process.env.DB_URL || "mongodb+srv://rockwell:rockwell__322@cloud.tggqp.mongodb.net/?retryWrites=true&w=majority";

export const CONFIG: ICONFIG = {
    PORT,
    DB_URL
};