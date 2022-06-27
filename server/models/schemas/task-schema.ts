import { Schema } from "mongoose";

const TaskSchema = new Schema({
    id: {type: String, required: true},
    description: {type: String, required: true},
    whom: {type: Array},
    importance: {type: Number, required: true, default: 0},
});

export default TaskSchema;