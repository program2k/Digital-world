import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetUser, apiUpdateUser, apiDeleteUser, apiOauth2Login,apiGetOauth2User } from "../APIs/user";

export const getUser = createAsyncThunk('user/user', async (data, { rejectWithValue }) => {
    const payload = await apiGetUser();

    if (payload.message === 'User fetched successfully') {
        return payload.result;
    } else {
        return rejectWithValue(payload)
    }
});

export const updateUser = createAsyncThunk('user/update', async ({ userId, data }, { rejectWithValue }) => {
    const payload = await apiUpdateUser(data, userId);

    if (payload.message === 'User updated successfully') {
        return payload.result;
    } else {
        return rejectWithValue(payload)
    }
});

export const deleteUser = createAsyncThunk('user/delete', async (userId, { rejectWithValue }) => {
    const payload = await apiDeleteUser(userId);

    if (payload.message === 'User deleted successfully') {
        return payload.result;
    } else {
        return rejectWithValue(payload)
    }
});

export const oauth2Login = createAsyncThunk('oauth2/login', async ({ oauth2Id, tokenLogin }, { rejectWithValue }) => {
    const payload = await apiOauth2Login(oauth2Id, tokenLogin);

    if (payload.message === 'Token created successfully') {
        return payload.token;
    } else {
        return rejectWithValue(payload.message);
    }
});

export const getOauth2User = createAsyncThunk('oauth2/user', async (oauth2Id, { rejectWithValue }) => {
    // console.log('token',token)
    console.log('oauth2Id', oauth2Id)
    const payload = await apiGetOauth2User(oauth2Id);

    if (payload.message === 'Success') {
        return payload.data;
    } else {
        return rejectWithValue(payload.message);
    }

});