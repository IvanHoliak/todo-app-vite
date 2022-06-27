import { createSlice } from "@reduxjs/toolkit";
import { IUserReducer } from "../../interfaces";
import { fetchAuthorization, fetchCreateProject, fetchLogin, fetchRegistration, fetchRemoveProject } from "../asyncActions";

const initialState: IUserReducer = {
    isAuth: false,
    user: {
        id: null, 
        name: ""
    },
    projects: [],
    error: null
};

const userReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuth = false;
            state.user = {
                id: null,
                name: ""
            };
            state.projects = [];
            localStorage.removeItem("todo_userid");
        }
    },
    extraReducers: (bulder) => {
        bulder
            .addCase(fetchRegistration.fulfilled, (state, action) => {
                state.isAuth = true;
                state.user = {
                    id: action.payload.data.id,
                    name: action.payload.data.name,
                },
                state.projects = action.payload.data.projects;
                state.error = null;
                localStorage.setItem("todo_userid", action.payload.data.id);
            })
            .addCase(fetchRegistration.rejected, (state, action) => {
                state.isAuth = false;
                state.error = action.payload || null;
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.isAuth = true;
                state.user = {
                    id: action.payload.data.id,
                    name: action.payload.data.name,
                },
                state.projects = action.payload.data.projects;
                state.error = null;
                localStorage.setItem("todo_userid", action.payload.data.id);
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.isAuth = false;
                state.error = action.payload || null;
            })
            .addCase(fetchAuthorization.fulfilled, (state, action) => {
                state.isAuth = true;
                state.user = {
                    id: action.payload.data.id,
                    name: action.payload.data.name,
                },
                state.projects = action.payload.data.projects;
                state.error = null;
            })
            .addCase(fetchAuthorization.rejected, (state, action) => {
                state.isAuth = false;
                state.error = action.payload || null;
            })
            .addCase(fetchCreateProject.fulfilled, (state, action) => {
                state.projects = [...state.projects, action.payload.data];
                state.error = null;
            })
            .addCase(fetchCreateProject.rejected, (state, action) => {
                state.error = action.payload || null;
            })
            .addCase(fetchRemoveProject.fulfilled, (state, action) => {
                state.projects = action.payload.data.projects;
                state.error = null;
            })
            .addCase(fetchRemoveProject.rejected, (state, action) => {
                state.error = action.payload || null;
            })
    }
});

export default userReducer.reducer;