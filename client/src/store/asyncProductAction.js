import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetProducts, apiUpdateProduct } from "../APIs/product";

export const getNewProducts = createAsyncThunk('product/newProducts', async (data, { rejectWithValue }) => {
    const payload = await apiGetProducts({ sort: '-sold' });

    if (payload.message === 'Get all products successfully') {
        return payload.data.products;
    } else {
        return rejectWithValue(payload)
    }
});

export const updateProduct = createAsyncThunk('product/updateProduct', async ({ productId, updatedData }, { rejectWithValue }) => {
    console.log('da chay update product')
    console.log({ productId, updatedData })
    const payload = await apiUpdateProduct(productId, updatedData);
    console.log(payload)

    if (payload.message === 'Update product successfully') {
        return payload.data;
    } else {
        return rejectWithValue(payload)
    }
})