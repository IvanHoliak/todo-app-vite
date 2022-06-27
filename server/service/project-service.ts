import projectModel from "../models/project-model";
import { createCategory, createTask, getProject, ICategory, ITask, removeTask, updateCategory } from "../types";
import { v4 } from "uuid";

class ProjectService {
    public getProject: getProject = async(id) => {
        try{
            const project = await projectModel.findOne({id});
            if(!project){
                throw new Error("Проект с таким id не найден");
            };

            return {status: 200, message: "Successfully finded project", data: {
                id: project.id,
                title: project.title,
                access: project.access,
                categories: project.categories,
                createdTime: project.createdTime,
                changedTime: project.changedTime
            }};
        }catch(e: any) {
            return {status: 400, message: `Unsuccessfully finded project: ${e.message}`};
        };
    };
    public createCategory: createCategory = async(id, title) => {
        try{
            const project = await projectModel.findOne({id});
            if(!project){
                throw new Error("Проект с таким id не найден");
            };

            const newCategory = {
                id: v4(),
                title,
                tasks: []
            };

            project.categories = [...project.categories, newCategory]

            project.save();

            return {status: 200, message: "Successfully created category", data: newCategory};
        }catch(e: any) {
            return {status: 400, message: `Unsuccessfully created category: ${e.message}`};
        };
    };
    public createTask: createTask = async(id, description, whom, importance) => {
        try{
            const project = await projectModel.findOne({id});
            if(!project){
                throw new Error("Проект с таким id не найден");
            };
            
            const newTask = {
                id: v4(),
                description,
                whom,
                importance
            };

            project.categories[0].tasks = [...project.categories[0].tasks, newTask];
            
            project.save();
            
            return {status: 200, message: "Successfully created task", data: newTask};
        }catch(e: any) {
            return {status: 400, message: `Unsuccessfully created task: ${e.message}`};
        };
    };
    public updateCategory: updateCategory = async(id, categories) => {
        try{
            const project = await projectModel.findOne({id});
            if(!project){
                throw new Error("Проект с таким id не найден");
            };

            project.categories = categories;

            project.save();
            
            return {status: 200, message: "Successfully update categories"};
        }catch(e: any) {
            return {status: 400, message: `Unsuccessfully update categories: ${e.message}`};
        };
    };
    public removeTask: removeTask = async(projectId, categoryId, taskId) => {
        try{
            const project = await projectModel.findOne({
                id: projectId,
            });

            if(!project){
                throw new Error("Проект с таким id не найден");
            };

            let sendToUser: ITask[] = [];

            project.categories = project.categories.map((category: ICategory) => {
                if(category.id === categoryId){
                    category.tasks = category.tasks.filter((task: ITask) => task.id !== taskId);
                    sendToUser = category.tasks;
                };
                return category;
            });

            project.save();
            
            return {status: 200, message: "Successfully remove task", data: sendToUser};
        }catch(e: any) {
            return {status: 400, message: `Unsuccessfully remove task: ${e.message}`};
        };
    };
};

export default new ProjectService();