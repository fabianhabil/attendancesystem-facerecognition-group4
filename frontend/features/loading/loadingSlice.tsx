import { createSlice } from '@reduxjs/toolkit';

const loadingPage = createSlice({
    name: 'loadingPage',
    initialState: { loading: false },
    reducers: {
        updateLoadingPage: (state, action) => {
            state.loading = action.payload.loading;
        }
    }
});

export const { updateLoadingPage } = loadingPage.actions;
export default loadingPage.reducer;
