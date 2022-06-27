import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IResponseUser, IUserAttributes, IUserCreateProject, IResponseProject, IResponseCategory, IResponseTask, IUserRemoveProject, IResponseUsers, IUsers, IUserRemoveTask, IResponseTasks } from "../../interfaces";

export const fetchLogin = createAsyncThunk<IResponseUser, IUserAttributes, {rejectValue: string}>(
    "user/fetchLogin",
    async (data, {rejectWithValue}) => {
        try{
            const response = await axios.post<IResponseUser>("/api/login", data);
            if(!response.data.data){
                return rejectWithValue(response.data.message);
            };
    
            return response.data;
        }catch(e: any){
            return rejectWithValue(e.response.data.message);
        };
    }
);

export const fetchAuthorization = createAsyncThunk<IResponseUser, string, {rejectValue: string}>(
    "user/fetchAuthorization",
    async (userid, {rejectWithValue}) => {
        try{
            const response = await axios.post<IResponseUser>("/api/getuser", {
                userid
            });
            if(!response.data.data){
                return rejectWithValue(response.data.message);
            };
    
            return response.data;
        }catch(e: any){
            return rejectWithValue(e.response.data.message);
        };
    }
);

export const fetchRegistration = createAsyncThunk<IResponseUser, IUserAttributes, {rejectValue: string}>(
    "user/fetchRegistration",
    async (data, {rejectWithValue}) => {
        try{
            const response = await axios.post<IResponseUser>("/api/registration", data);
            if(!response.data.data){
                return rejectWithValue(response.data.message);
            };
    
            return response.data;
        }catch(e: any){
            return rejectWithValue(e.response.data.message);
        };
    }
);

export const fetchCreateProject = createAsyncThunk<IResponseProject, IUserCreateProject, {rejectValue: string}>(
    "user/fetchCreateProject",
    async (data, {rejectWithValue}) => {
        try{
            const response = await axios.post<IResponseProject>("/api/create_project", data);
            if(!response.data.data){
                return rejectWithValue(response.data.message);
            };
    
            return response.data;
        }catch(e: any){
            return rejectWithValue(e.response.data.message);
        };
    }
);

export const fetchRemoveProject = createAsyncThunk<IResponseUser, IUserRemoveProject, {rejectValue: string}>(
    "user/fetchRemoveProject",
    async (data, {rejectWithValue}) => {
        try{
            const response = await axios.delete<IResponseUser>("/api/remove_project", {
                data
            });
            if(!response.data.data){
                return rejectWithValue(response.data.message);
            };
    
            return response.data;
        }catch(e: any){
            return rejectWithValue(e.response.data.message);
        };
    }
);
export const fetchRemoveTask = createAsyncThunk<IResponseTasks, IUserRemoveTask, {rejectValue: string}>(
    "user/fetchRemoveTask",
    async (data, {rejectWithValue}) => {
        try{
            const response = await axios.post<IResponseTasks>("/api/remove_task", data);
            if(!response.data.data){
                return rejectWithValue(response.data.message);
            };

            response.data.categoryId =  data.categoryId;
            
            return response.data;
        }catch(e: any){
            return rejectWithValue(e.response.data.message);
        };
    }
);

export const fetchProject = createAsyncThunk<IResponseProject, string, {rejectValue: string}>(
    "project/fetchProject",
    async (id, {rejectWithValue}) => {
        try{
            const response = await axios.post<IResponseProject>("/api/getproject", {
                id
            });
    
            if(!response.data.data){
                return rejectWithValue(response.data.message);
            };
    
            return response.data;
        }catch(e: any){
            return rejectWithValue(e.response.data.message);
        };
    }
);

interface ICreateCategory {
    id: string;
    title: string;
};

export const fetchCreateCategory = createAsyncThunk<IResponseCategory, ICreateCategory, {rejectValue: string}>(
    "project/fetchCreateCategory",
    async (data, {rejectWithValue}) => {
        try{
            const response = await axios.post<IResponseCategory>("/api/create_category", data);
    
            if(!response.data.data){
                return rejectWithValue(response.data.message);
            };
    
            return response.data;
        }catch(e: any){
            return rejectWithValue(e.response.data.message);
        }
    }
);

interface ICreateTask {
    id: string;
    description: string;
    whom: string[];
    importance: number;
};

export const fetchCreateTask = createAsyncThunk<IResponseTask, ICreateTask, {rejectValue: string}>(
    "project/fetchCreateTask",
    async (data, {rejectWithValue}) => {
        try{
            const response = await axios.post<IResponseTask>("/api/create_task", data);
    
            if(!response.data.data){
                return rejectWithValue(response.data.message);
            };
    
            return response.data;
        }catch(e: any){
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const fetchGetUsers = createAsyncThunk<IResponseUsers>(
    "project/fetchGetUsers",
    async () => {
        try{
            const response = await axios.get<IResponseUsers>("/api/getusers");
    
            if(!response.data.data){
                return response.data.message;
            };
    
            return response.data;
        }catch(e: any){
            return e.response.data.message;
        }
    }
);