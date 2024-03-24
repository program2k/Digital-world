import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../store/asyncAction.js"

export const apSlice = createSlice({
    name: 'app',
    initialState: {
        categories: null,
        isLoading: false,
        isShowModal: false,
        isShowCart: false,
        modalChildren: null
    },
    reducers: {
        showModal: (state, action) => {
            state.isShowModal = action.payload.isShowModal;
            state.modalChildren = action.payload.modalChildren;
        },
        showCart: (state, action) => {
            state.isShowCart = state.isShowCart === false ? true : false;
        },
        logout: (state) => {
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories = action.payload;
        });

        builder.addCase(getCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    },
})

export const { showModal, showCart } = apSlice.actions;
export default apSlice.reducer;