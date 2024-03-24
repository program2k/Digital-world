import { createSlice } from "@reduxjs/toolkit";
import { getUser, updateUser, deleteUser, oauth2Login, getOauth2User  } from "./asyncUserAction.js";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogin: false,
        isOauth2Login: false,
        current: null,
        currentCart: [],
        token: null,
        isLoading: false,
        mes: ''
    },
    reducers: {
        login: (state, action) => {
            state.isLogin = action.payload.isLogin;
            state.isOauth2Login = false;
            state.token = action.payload.token;
        },
        logout: (state, action) => {
            state.isLogin = false;
            state.isOauth2Login = false;
            state.token = null;
            state.current = null;
            state.isLoading = false;
            state.mes = '';
        },
        updateCart: (state, action) => {
            const { p_id, quantity, color } = action.payload;
            //tạo một bản sao sâu (deep copy) của giỏ hàng hiện tại. Bản sao sâu được tạo để đảm bảo rằng chúng ta không thay đổi trạng thái hiện tại trực tiếp.
            const updatingCart = JSON.parse(JSON.stringify(state.currentCart));
            const updatedItem = updatingCart.map((item) => {
                if (item.color === color && item.product._id === p_id) {
                    return {
                        ...item,
                        quantity
                    };
                } else {
                    return item;
                }
            });
            state.currentCart = updatedItem;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.current = action.payload;
            state.isLogin = true;
            state.currentCart = action.payload.carts;
        });

        builder.addCase(getUser, (state, action) => {
            state.isLoading = false;
            state.current = null;
        });
        builder.addCase(updateUser.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.current = action.payload;
        });

        builder.addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false;
            state.mes = action.error.message;
        });
        builder.addCase(deleteUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.current = null;
        });

        builder.addCase(deleteUser.rejected, (state, action) => {
            state.isLoading = false;
            state.mes = action.error.message;
        });
        builder.addCase(oauth2Login.fulfilled, (state, action) => {
            // Tự động chạy khi createAsyncThunk thành công
            state.isLogin = true;
            state.isOauth2Login = true;
            state.token = action.payload;
        });
        builder.addCase(oauth2Login.rejected, (state) => {
            // Tự động chạy khi createAsyncThunk thất bại
            state.isLoading = false;
            state.isLogin = false;
            state.isOauth2Login = false;
            state.token = null;
        });
        builder.addCase(getOauth2User.fulfilled, (state, action) => {
            // Tự động chạy khi createAsyncThunk thành công
            state.current = action.payload;
        });
        builder.addCase(getOauth2User.rejected, (state) => {
            // Tự động chạy khi createAsyncThunk thất bị
            state.isLoading = false;
        });
    },
})

export const { login, logout, updateCart } = userSlice.actions;
export default userSlice.reducer;