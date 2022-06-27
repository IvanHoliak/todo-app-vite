import { Schema, model } from "mongoose";
import CategorySchema from "./schemas/category-schema";

const ProjectSchema = new Schema({
    id: {type: String, required: true, unique: true},
    title: {type: String, required: true},
    access: {type: Array},
    createdTime: {type: Number, required: true},
    changedTime: {type: Number, required: true},
    categories: [CategorySchema]
}, {
    collection: "projects",
});

export default model("Project", ProjectSchema);