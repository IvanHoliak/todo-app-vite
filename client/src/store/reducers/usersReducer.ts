import { createSlice } from "@reduxjs/toolkit";
import { IUsers } from "../../interfaces";
import { fetchGetUsers } from "../asyncActions";

const initialState: IUsers[] = [];

const usersReducer = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetUsers.fulfilled, (state, action) => {
                return action.payload.data;
            })
            .addCase(fetchGetUsers.rejected, (state, action) => {
                console.log(action.payload);
            })
    }
});

export default usersReducer.reducer;