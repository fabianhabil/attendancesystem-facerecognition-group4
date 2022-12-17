import { createSlice } from '@reduxjs/toolkit';

const attendanceLecture = createSlice({
    name: 'attendanceLecture',
    initialState: '',
    reducers: {
        updateAttendanceLecture: (state, action) => {
            return action.payload.lecture;
        }
    }
});

export const { updateAttendanceLecture } = attendanceLecture.actions;
export default attendanceLecture.reducer;
