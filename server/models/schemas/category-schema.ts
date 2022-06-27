import { Schema } from "mongoose";
import TaskSchema from "./task-schema";

const CategorySchema = new Schema({
    id: {type: String, required: true}, 
    title: {type: String, required: true},
    tasks: [TaskSchema]
});

export default CategorySchema;

