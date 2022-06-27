import { Request, Response, NextFunction } from "express";
import projectService from "../service/project-service";

class ProjectController {
    public async getProject(req: Request, res: Response, next: NextFunction) {
        try{
            const { id } = req.body;
            const projectData = await projectService.getProject(id);

            res.status(projectData.status).json(projectData);
        }catch(e){
            console.log("[login]: ", e);
        }
    };
    public async createCategory(req: Request, res: Response, next: NextFunction) {
        try{
            const { id, title } = req.body;
            const projectData = await projectService.createCategory(id, title);

            res.status(projectData.status).json(projectData);
        }catch(e){
            console.log("[login]: ", e);
        }
    };
    public async createTask(req: Request, res: Response, next: NextFunction) {
        try{
            const { id, description, whom, importance } = req.body;
            const projectData = await projectService.createTask(id, description, whom, importance);

            res.status(projectData.status).json(projectData);
        }catch(e){
            console.log("[login]: ", e);
        }
    };
    public async updateCategory(req: Request, res: Response, next: NextFunction) {
        try{
            const { id, categories } = req.body;
            const projectData = await projectService.updateCategory(id, categories);

            res.status(projectData.status).json(projectData);
        }catch(e){
            console.log("[login]: ", e);
        }
    };
    public async removeTask(req: Request, res: Response, next: NextFunction) {
        try{
            const { projectId, categoryId, taskId } = req.body;
            const projectData = await projectService.removeTask(projectId, categoryId, taskId);

            res.status(projectData.status).json(projectData);
        }catch(e){
            console.log("[login]: ", e);
        }
    };
};

export default new ProjectController();