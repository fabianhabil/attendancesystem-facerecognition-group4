import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {},
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false
        }),
    // Change when production
    devTools: true
});

export default store;
