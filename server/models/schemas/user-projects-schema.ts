import { Schema } from "mongoose";

const UserProjectSchema = new Schema({
    id: {type: String, required: true, unique: true},
    title: {type: String, required: true}
});

export default UserProjectSchema;