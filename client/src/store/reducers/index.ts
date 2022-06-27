import dragReducer from "./dragReducer";
import modalReducer from "./modalReducer";
import projectReducer from "./projectReducer";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";

export default {
    user: userReducer,
    users: usersReducer,
    project: projectReducer,
    drag: dragReducer,
    modal: modalReducer,
};