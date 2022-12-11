import React, { useState } from 'react';
import Head from 'next/head';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import { Grid, Box } from '@mui/material';
import Main from '../ContentWrapper/ContentWrapper';
// import { useRouter } from 'next/router';
// import { useSelector, useDispatch } from 'react-redux';
// import { resetStepperCreateEvent } from '../../../../features/event/stepper/stepperCreateEvent';
// import { resetNewEventSlice } from '../../../../features/event/eventInfo/eventInfoSlice';
// import { updateUserInfo, resetUserInfo } from '../../../../features/userInfo/userInfoSlice';
// import { updateLoadingPage } from '../../../../features/loading/loadingSlice';
// import ToastError from '../../../atoms/toast/toasterror/toasterror';
// import { useAuth } from '../../../../contexts/auth';
// import type { globalState } from '../../../../types/state/redux-type';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    // const dispatch = useDispatch();
    // const router = useRouter();
    // const { checkRole }: any = useAuth();
    // const { loading } = useSelector((state: globalState) => state.loadingPage);
    // const { role } = useSelector((state: globalState) => state.userInfo);
    const [loading, setLoading] = useState<boolean>(false);

    // useEffect(() => {
    //     const data = JSON.parse(localStorage.getItem('data') as string);
    //     console.log(data);
    //     if (data) {
    //         dispatch(updateUserInfo({ data }));
    //     } else {
    //         dispatch(resetUserInfo());
    //     }
    // }, [dispatch]);

    // useEffect(() => {
    //     if (
    //         router.pathname !== '/events/create' &&
    //         router.pathname !== '/events/payment' &&
    //         router.pathname !== '/topup' &&
    //         router.pathname !== '/events/edit/[id]' &&
    //         router.pathname !== '/events/[id]' &&
    //         router.pathname !== '/gallery/[id]'
    //     ) {
    //         dispatch(resetStepperCreateEvent());
    //         dispatch(resetNewEventSlice());
    //     }

    //     dispatch(updateLoadingPage({ loading: false }));
    // }, [dispatch, router.pathname]);

    // useEffect(() => {
    //     if (router.pathname.split('/')[1] === 'admin') {
    //         if (role < 1) {
    //             // Handle Here
    //             const notice = 'You are not authorized';
    //             ToastError(notice);
    //             router.push('/events');
    //         } else {
    //             const checkRoleFunction = async () => {
    //                 const test = await checkRole();
    //                 return test;
    //             };
    //             checkRoleFunction().then((res) => {
    //                 if (res < 1) {
    //                     const notice = 'You are not authorized';
    //                     ToastError(notice);
    //                     router.push('/events');
    //                 }
    //             });
    //         }
    //     }
    // }, [role, router.pathname]);

    return (
        <>
            <Head>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1'
                />
            </Head>
            <Grid container direction='row'>
                <Grid item sx={{ display: { xs: 'none', lg: 'flex' } }}>
                    <Sidebar />
                </Grid>
                <Grid item xs sx={{ minHeight: '100vh', pb: 2 }}>
                    <Grid container direction='column'>
                        <Grid item>
                            <Navbar />
                        </Grid>
                        <Grid item>
                            <Main>
                                {loading ? (
                                    <>
                                        <Box
                                            component='div'
                                            sx={{
                                                position: 'fixed',
                                                top: 0,
                                                left: { md: '240px', sm: '0px', xs: '0px' },
                                                right: 0,
                                                minHeight: '92.6vh',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                display: 'flex'
                                            }}
                                        >
                                            <img src='/loading/loading.svg' alt='loading' />
                                        </Box>
                                        <Box component='div' sx={{ opacity: 0.3, pointerEvents: 'none' }}>
                                            {children}
                                        </Box>
                                    </>
                                ) : (
                                    children
                                )}
                            </Main>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Layout;
