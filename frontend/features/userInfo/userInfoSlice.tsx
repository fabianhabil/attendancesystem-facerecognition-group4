import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const userInfo = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        updateUserInfo: (_, action) => {
            return action.payload.data;
        },
        resetUserInfo: () => initialState
    }
});

export const { updateUserInfo, resetUserInfo } = userInfo.actions;
export default userInfo.reducer;
