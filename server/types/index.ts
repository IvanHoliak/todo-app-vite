export interface IProjects {
    id: string;
    title: string;
}

export interface IUser {
    id?: string;
    name?: string;
    projects: IProjects[]
}

export interface IProject {
    id: string;
    title: string;
    access: [],
    categories: [],
    changedTime: number;
    createdTime: number;
};

export interface ICategory {
    id: string;
    title: string;
    tasks: any[];
};

export interface ITask {
    id: string;
    description: string;
    whom: string[] | any[];
};

export interface IUsers {
    _id: string;
    id: string;
    name: string;
};

// Express
export type StartServer = () => void;

// service
export type registration = (name: string, password: string) => Promise<{status: number, message: string, data?: IUser}>;
export type login = (name: string, password: string) => Promise<{status: number, message: string, data?: IUser}>;
export type getUser = (id: string) => Promise<{status: number, message: string, data?: IUser}>;
export type getUsers = () => Promise<{status: number, message: string, data?: IUsers[]}>;
export type createProject = (title: string, access: IUsers[]) => Promise<{status: number, message: string, data?: IProjects}>;
export type removeProject = (userid: string, projectid: string) => Promise<{status: number, message: string, data?: IUser}>;

export type getProject = (id: string) => Promise<{status: number, message: string, data?: IProject}>;
export type createCategory = (id: string, title: string) => Promise<{status: number, message: string, data?: ICategory}>;
export type createTask = (id: string, description: string, whom: string[], importance: number) => Promise<{status: number, message: string, data?: ITask}>;
export type updateCategory = (id: string, categories: ICategory[]) => Promise<{status: number, message: string}>;
export type removeTask = (projectId: string, categoryId: string, taskId: string) => Promise<{status: number, message: string}>;