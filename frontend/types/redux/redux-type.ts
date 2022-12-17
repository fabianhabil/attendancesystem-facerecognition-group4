import type userType from '../user/user-type';

export interface globalState {
    loadingPage: {
        loading: boolean;
    };
    userInfo: userType;
    attendanceLecture: string;
}
