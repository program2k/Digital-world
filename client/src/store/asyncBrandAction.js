import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetBrands } from "../APIs/brand";

export const getBrands = createAsyncThunk("brand/getBrands", async (data, { rejectWithValue }) => {
    const payload = await apiGetBrands();

    if (payload.message === "Success") {
        return payload.data;
    } else {
        return rejectWithValue(payload);
    }
});
