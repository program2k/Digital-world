import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetCategories } from "../APIs/app";

export const getCategories = createAsyncThunk('app/category', async(data, {rejectWithValue}) => {
    const payload = await apiGetCategories();

    if (payload.message === 'Success') {
        return payload.ProductCategories;
    } else {
        return rejectWithValue(payload)
    }
});