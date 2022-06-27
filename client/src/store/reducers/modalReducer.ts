import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModalReducer } from "../../interfaces";

const initialState: IModalReducer = {
    isOpen: false,
    modalType: ""
};

const modalReducer = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setModalState: (state, action: PayloadAction<IModalReducer>) => {
            state.isOpen = action.payload.isOpen;
            state.modalType = action.payload.modalType;
        },
    },
});

export default modalReducer.reducer;