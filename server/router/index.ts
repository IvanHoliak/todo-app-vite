import { Router } from "express";
import ProjectController from "../controller/project-controller";
import userController from "../controller/user-controller";

const _router = Router();

_router.get("/getusers", userController.getUsers);

_router.post("/login", userController.login);
_router.post("/registration", userController.registration);
_router.post("/getuser", userController.getUser);


_router.post("/getproject", ProjectController.getProject);
_router.post("/create_project", userController.createProject);
_router.post("/create_category", ProjectController.createCategory);
_router.post("/create_task", ProjectController.createTask);
_router.post("/remove_task", ProjectController.removeTask);
_router.post("/update_categories", ProjectController.updateCategory);

_router.delete("/remove_project", userController.removeProject);
export default _router;