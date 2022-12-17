import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from '../features/loading/loadingSlice';
import userInfoReducer from '../features/userInfo/userInfoSlice';
import attendanceLectureReducer from '../features/attendanceLecture/attendanceLectureSlice';

const store = configureStore({
    reducer: {
        loadingPage: loadingReducer,
        userInfo: userInfoReducer,
        attendanceLecture: attendanceLectureReducer
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
