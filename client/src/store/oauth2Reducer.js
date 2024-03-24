import { createSlice } from "@reduxjs/toolkit";
import { oauth2Login, getOauth2User } from "./asyncOauth2Action";

export const oauth2Slice = createSlice({
    name: 'oauth2',
    initialState: {
        isLoading: false,
        isOauth2Login: false,
        token: null,
        oauth2Current: null
    },
    reducers: {
        logout: (state) => {
            state.isOauth2Login = false;
            state.token = null;
            state.oauth2Current = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(oauth2Login.fulfilled, (state, action) => {
            // Tự động chạy khi createAsyncThunk thành công
            state.isOauth2Login = true;
            state.token = action.payload;
        });
        builder.addCase(oauth2Login.rejected, (state) => {
            // Tự động chạy khi createAsyncThunk thất bại
            state.isLoading = false;
            state.isOauth2Login = false;
            state.token = null;
        });
        builder.addCase(getOauth2User.fulfilled, (state, action) => {
            // Tự động chạy khi createAsyncThunk thành công
            state.oauth2Current = action.payload;
        });
        builder.addCase(getOauth2User.rejected, (state) => {
            // Tự động chạy khi createAsyncThunk thất bị
            state.isLoading = false;
        });
    }
});

export const { loginSuccess, logout } = oauth2Slice.actions; // Thay đổi tên action thành 'loginSuccess'
export default oauth2Slice.reducer;
