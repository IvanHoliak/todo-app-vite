import { Request, Response, NextFunction } from "express";
import UserService from "../service/user-service";

class UserController {
    public async login(req: Request, res: Response, next: NextFunction) {
        try{
            const {name, password} = req.body;
            const userData = await UserService.login(name, password);

            res.status(userData.status).json(userData);
        }catch(e){
            console.log("[login]: ", e);
        }
    };
    public async registration(req: Request, res: Response, next: NextFunction) {
        try{
            const {name, password} = req.body;
            const userData = await UserService.registration(name, password);
            
            res.status(userData.status).json(userData);
            
        }catch(e){
            console.log("[registration]: ", e);
        }
    };
    public async getUser(req: Request, res: Response, next: NextFunction) {
        try{
            const {userid} = req.body;
            const userData = await UserService.getUser(userid);
            
            res.status(userData.status).json(userData);
            
        }catch(e){
            console.log("[get user]: ", e);
        }
    };
    public async getUsers(req: Request, res: Response, next: NextFunction) {
        try{
            const userData = await UserService.getUsers();
            
            res.status(userData.status).json(userData);
            
        }catch(e){
            console.log("[get users]: ", e);
        }
    };
    public async createProject(req: Request, res: Response, next: NextFunction) {
        try{
            const {title, access} = req.body;
            const userData = await UserService.createProject(title, access);
            
            res.status(userData.status).json(userData);
            
        }catch(e){
            console.log("[create project]: ", e);
        }
    };
    public async removeProject(req: Request, res: Response, next: NextFunction) {
        try{
            const {userid, projectid} = req.body;
            const userData = await UserService.removeProject(userid, projectid);
            
            res.status(userData.status).json(userData);
            
        }catch(e){
            console.log("[create project]: ", e);
        }
    };
};

export default new UserController();