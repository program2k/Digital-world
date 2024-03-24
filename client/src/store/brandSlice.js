import { createSlice } from "@reduxjs/toolkit";
import { getBrands } from "./asyncBrandAction";

export const brandSlice = createSlice({
    name: 'brand',
    initialState: {
        brands: null,
        isLoading: false,
        message:''
    },
    reducers: {
        logout: (state) => {
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getBrands.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(getBrands.fulfilled, (state, action) => {
            state.isLoading = false;
            state.brands = action.payload;
        });

        builder.addCase(getBrands.rejected, (state, action) => {
            state.isLoading = false;
            // state.message = action.payload.message;
        });
    },
})

export const { logout } = brandSlice.actions;
export default brandSlice.reducer;