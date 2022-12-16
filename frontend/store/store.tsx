import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from '../features/loading/loadingSlice';
import userInfoReducer from '../features/userInfo/userInfoSlice';

const store = configureStore({
    reducer: {
        loadingPage: loadingReducer,
        userInfo: userInfoReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false
        }),
    // Change when production
    devTools: true
});

export default store;
