import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiOauth2Login, apiGetOauth2User } from "../APIs/oauth2User";

export const oauth2Login = createAsyncThunk('oauth2/login', async ({ oauth2Id, tokenLogin }, { rejectWithValue }) => {
    const payload = await apiOauth2Login({ oauth2Id, tokenLogin });

    if (payload.message === 'Token created successfully') {
        return payload.token;
    } else {
        return rejectWithValue(payload.message);
    }
});

export const getOauth2User = createAsyncThunk('oauth2/user', async (token, { rejectWithValue }) => {
    console.log(token)
    const payload = await apiGetOauth2User(token);

    if (payload.message === 'Success') {
        return payload.data;
    } else {
        return rejectWithValue(payload.message);
    }

});
