import { Schema, model } from "mongoose";
import UserProjectSchema from "./schemas/user-projects-schema";

const UserSchema = new Schema({
    id: {type: String, required: true, unique: true},
    name: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    projects: [UserProjectSchema],
}, {
    collection: "users",
});

export default model("User", UserSchema);
