import userModel from "../models/user-model";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import { createProject, getUser, getUsers, login, registration, removeProject } from "../types";
import projectModel from "../models/project-model";

class UserService {
    public registration: registration = async(name, password) => {
        try{
            const person = await userModel.findOne({name});
            if(person){
                throw new Error("Пользователь с таким никнеймом уже существует");
            };

            const hashPassword = await bcrypt.hash(password, 3);

            const user = await userModel.create({
                id: v4(),
                name,
                password: hashPassword,
                project: []
            });

            return {status: 201, message: "Successfully registered", data: {
                id: user.id,
                name: user.name,
                projects: user.projects
            }};
        }catch(e: any){
            return {status: 400, message: `Unsuccessfully registered: ${e.message}`};
        };
    };
    public login: login = async(name, password) => {
        try{
            const person = await userModel.findOne({name});
            if(!person){
                throw new Error("Пользователя с таким никнеймом не существует");
            };

            const comparePassword = await bcrypt.compare(password, person.password);
            if(!comparePassword){
                throw new Error("Некорректный пароль");
            };

            return {status: 200, message: "Successfully logined", data: {
                id: person.id,
                name: person.name,
                projects: person.projects
            }};
        }catch(e: any){
            return {status: 400, message: `Unsuccessfully logined: ${e.message}`};
        };
    };
    public getUser: getUser = async(id) => {
        try{
            const person = await userModel.findOne({id});
            if(!person){
                throw new Error("Пользователя с таким id не существует");
            };

            return {status: 200, message: "Successfully got user", data: {
                id: person.id,
                name: person.name,
                projects: person.projects
            }};
        }catch(e: any){
            return {status: 400, message: `Unsuccessfully got user: ${e.message}`};
        };
    };
    public getUsers: getUsers = async() => {
        try{
            const users = await userModel.find().select(["id", "name"]);
            if(!users){
                throw new Error("Пользователи не найдены");
            };

            return {status: 200, message: "Successfully got users", data: users};
        }catch(e: any){
            return {status: 400, message: `Unsuccessfully got users: ${e.message}`};
        };
    };
    public createProject: createProject = async(title, access) => {
        try{
            const id = v4();

            const person = await userModel.find({id: access.map(name => name.id)})
                .updateMany({$push: {projects: {id, title}}});

            if(!person){
                throw new Error("Пользователя с таким id не найден");
            };

            const project = await projectModel.create({
                id,
                title,
                access: access.map(name => name.name),
                categories: [],
                createdTime: Date.now(),
                changedTime: Date.now()
            });

            return {status: 200, message: "Successfully created project", data: {
                id,
                title
            }};
        }catch(e: any){
            return {status: 400, message: `Unccessfully created project: ${e.message}`};
        };
    };

    public removeProject: removeProject = async(userid, projectid) => {
        try{
            const people = await userModel.find({"projects.id": projectid}).updateMany({$pull: {projects: {id: projectid}}});
            
            if(!people){
                throw new Error("Пользователя с таким id не найден");
            };

            const project = await projectModel.findOne({id: projectid});

            if(!project) {
                throw new Error("Проект с таким id не найден");
            };

            project.remove();

            const person = await userModel.findOne({id: userid});

            return {status: 200, message: "Successfully remove project", data: {
                id: person.id,
                name: person.name,
                projects: person.projects
            }};
        }catch(e: any){
            return {status: 400, message: `Unccessfully remove project: ${e.message}`};
        };
    };
};

export default new UserService();