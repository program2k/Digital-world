import { configureStore } from '@reduxjs/toolkit';
import { productSlice } from './productReducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import userSlice from './userSlice';
import appReducer from './appReducer';
import brandSlice from './brandSlice';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const commonConfig = {
  key: 'shop/user',
  storage,
  stateReconciler: autoMergeLevel2
};

const userConfig = {
  ...commonConfig,
  whiteList: ['isLogin', 'token', 'current', 'currentCart'],
};

export const store = configureStore({
  reducer: {
    userReducer: persistReducer(userConfig, userSlice),
    productReducer: productSlice,
    appReducer: appReducer,
    brandReducer: brandSlice
  },
});

export const persistor = persistStore(store);

