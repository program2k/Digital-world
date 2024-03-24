import { createSlice } from "@reduxjs/toolkit";
import { getNewProducts, updateProduct } from "../store/asyncProductAction.js"


export const productSlice = createSlice({
    name: 'product',
    initialState: {
        newProducts: null,
        current: null,
        errorMessage: '',
    },
    reducers: {
        logout: (state) => {
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getNewProducts.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(getNewProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.newProducts = action.payload; 
        });

        builder.addCase(getNewProducts, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
        builder.addCase(updateProduct.pending, (state) => {
            console.log('pending')
            state.isLoading = true;
        });

        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.current = action.payload;
        });

        builder.addCase(updateProduct.rejected, (state, action) => {
            console.log('rejected')
            state.isLoading = false;
            state.errorMessage = action.error.message;
        });
    },
})

export const { logout } = productSlice.actions;
export default productSlice.reducer;