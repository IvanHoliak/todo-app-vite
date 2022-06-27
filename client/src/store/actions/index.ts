import { createAction } from "@reduxjs/toolkit";
import { IModalReducer, ICurrentDragReducer, ICategory } from "../../interfaces";

//Modal
export const setModalState = createAction<IModalReducer>("modal/setModalState");

//Current Drag
export const setCurrentState = createAction<ICurrentDragReducer>("drag/setCurrentState");

//Project

export const setProjectCategories = createAction<ICategory[]>("project/setProjectCategories");
export const removeProject = createAction("project/removeProject");
export const setNewTitle = createAction<{id: string, title: string}>("project/setNewTitle");
export const setNewTaskDescription = createAction<{taskId: string, categoryId: string, description: string}>("project/setNewTaskDescription");

//User
export const login = createAction("user/login");
export const logout = createAction("user/logout");
