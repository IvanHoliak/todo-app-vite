export interface ITask {
    id: string;
    description: string;
    whom: string[];
    importance: number;
};

export interface IUsers {
    _id?: string;
    id: string;
    name: string;
};

export interface ICategory {
    id: string;
    title: string;
    tasks: ITask[];
};

export interface IProject {
    id: string;
    title: string;
    createdTime: number;
    changedTime: number;
    access?: string[];
    categories?: ICategory[];
};

export interface IProjectLists {
    id: string;
    title: string;
};

export interface ITodoCategory { 
    category: ICategory;
    createTask: boolean;
}

export interface ITodoCard {
    key: string;
    task: ITask;
    category: ICategory;
};


// REDUCER INTERFACES

export interface IModalReducer {
    isOpen: boolean;
    modalType: string;
};

export interface IUserReducer {
    isAuth: boolean;
    user: {
        id: string | null;
        name: string;
    };
    projects: IProjectLists[],
    error: string | null
};

export interface ICurrentDragReducer {
    currentTask: ITask | null;
    currentCategory: ICategory | null;
};

// DISPATCH INTERFACES

export interface IDispatchCategories {
    type: string;
    payload: ICategory[];
};

export interface IDispatchDrag {
    type: string;
    payload: ICurrentDragReducer
};

// ASYNC ACTIONS 

export interface IResponse {
    status: number;
    message: string;
};

export interface IResponseTasks extends IResponse {
    categoryId?: string;
    data: ITask[]
};

export interface IResponseUsers extends IResponse {
    data: IUsers[];
};

export interface IResponseUser extends IResponse {
    data: {
        id: string;
        name: string;
        projects: []
    };
};

export interface IResponseProject extends IResponse {
    data: IProject;
};

export interface IResponseCategory extends IResponse {
    data: ICategory;
};

export interface IResponseTask extends IResponse {
    data: ITask;
};

export interface IUserAttributes {
    name: string;
    password: string;
};

export interface IUserCreateProject {
    // userid: string | null;
    title: string;
    access: IUsers[];
};

export interface IUserRemoveProject {
    userid: string;
    projectid: string;
};

export interface IUserRemoveTask {
    projectId: string;
    categoryId: string;
    taskId: string;
}