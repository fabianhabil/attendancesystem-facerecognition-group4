import type { globalState } from '../../../types/redux/redux-type';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import { Grid, Box } from '@mui/material';
import Main from '../ContentWrapper/ContentWrapper';
import { useSelector, useDispatch } from 'react-redux';
import { resetUserInfo, updateUserInfo } from '../../../features/userInfo/userInfoSlice';
import { useRouter } from 'next/router';
import ToastError from '../../Toast/ToastError';
import type userType from '../../../types/user/user-type';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading } = useSelector((state: globalState) => state.loadingPage);

    useEffect(() => {
        const data: userType = JSON.parse(localStorage.getItem('data') as string);
        if (data) {
            dispatch(updateUserInfo({ data }));
        } else {
            dispatch(resetUserInfo());
            ToastError('Please login first!');
            setTimeout(() => {
                router.push('/');
            }, 500);
        }
    }, [dispatch]);

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
                                                left: { md: '0%', sm: '0px', xs: '0px', lg: '240px' },
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
