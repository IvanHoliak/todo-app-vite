import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICurrentDragReducer } from "../../interfaces";

const initialState: ICurrentDragReducer = {
    currentTask: null,
    currentCategory: null
};

const dragReducer = createSlice({
    name: "drag",
    initialState,
    reducers: {
        setCurrentState: (state, action: PayloadAction<ICurrentDragReducer>) => {
            state.currentTask = action.payload.currentTask;
            state.currentCategory = action.payload.currentCategory;
        }
    }
});

export default dragReducer.reducer;

