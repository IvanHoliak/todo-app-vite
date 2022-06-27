import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProject, ICategory } from "../../interfaces";
import { fetchCreateCategory, fetchCreateTask, fetchProject, fetchRemoveTask } from "../asyncActions";

const initialState = null as IProject | null;

const projectReducer = createSlice({
    name: "project",
    initialState,
    reducers: {
        setProjectCategories: (state, action: PayloadAction<ICategory[]>) => {
            if(state?.categories){
                state.categories = action.payload;
            };
        },
        setNewTitle: (state, action: PayloadAction<{id: string, title: string}>) => {
            if(state?.categories){
                state.categories.map(category => {
                    if(category.id === action.payload.id){
                        category.title = action.payload.title;
                    };
                    return category;
                });
            };
        },
        setNewTaskDescription: (state, action: PayloadAction<{taskId: string, categoryId: string, description: string}>) => {
            if(state?.categories){
                state.categories.map(category => {
                    if(category.id === action.payload.categoryId){
                        category.tasks.map(task => {
                            if(task.id === action.payload.taskId){
                                task.description = action.payload.description;
                            };
                            return task;
                        });
                    };
                    return category;
                });
            };
        },
        removeProject: () => {
            return null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProject.fulfilled, (state, action) => {
                return {...action.payload.data};
            })
            .addCase(fetchProject.rejected, (state, action) => {
                console.log(action.payload);
            })
            .addCase(fetchCreateCategory.fulfilled, (state, action) => {
                if(state?.categories){
                    state.categories = [...state.categories, action.payload.data];
                };
            })
            .addCase(fetchCreateCategory.rejected, (state, action) => {
                console.log(action.payload);
            })
            .addCase(fetchCreateTask.fulfilled, (state, action) => {
                if(state?.categories){
                    state.categories[0].tasks = [...state.categories[0].tasks, action.payload.data]
                };
            })
            .addCase(fetchCreateTask.rejected, (state, action) => {
                console.log(action.payload);
            })
            .addCase(fetchRemoveTask.fulfilled, (state, action) => {
                if(state?.categories){
                    state.categories = state.categories.map(category => {
                        if(category.id === action.payload.categoryId){
                            category.tasks = action.payload.data;
                        };
                        return category;
                    });
                };
            })
            .addCase(fetchRemoveTask.rejected, (state, action) => {
                console.log(action.payload);
            })
    },
});

export default projectReducer.reducer;