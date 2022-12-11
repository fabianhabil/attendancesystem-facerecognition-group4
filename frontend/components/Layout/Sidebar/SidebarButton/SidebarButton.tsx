/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Button, ThemeProvider } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import theme from '../../../../theme/theme';
import { useSelector } from 'react-redux';
import type { ReactNode } from 'react';

interface Props {
    name: string;
    icon: ReactNode;
    href: string;
    subPage?: boolean;
    admin?: boolean;
}

const SidebarButton: React.FC<Props> = ({ name, icon, href, subPage, admin }) => {
    const router = useRouter();
    let routerName = `/${router.pathname.split('/')[1]}`;
    const [render, setRender] = useState(true);

    // useEffect(() => {
    //     if (admin === true) {
    //         if (role >= 1) {
    //             setRender(true);
    //         } else {
    //             setRender(false);
    //         }
    //     } else {
    //         setRender(true);
    //     }
    // }, [admin, role]);

    const checkRouteBg = () => {
        if (subPage) {
            if (router.pathname.split('/')[2] !== undefined) {
                routerName = `${routerName}/${router.pathname.split('/')[2]}`;
            }
            if (routerName === href) {
                return '#537E9D';
            } else {
                return '';
            }
        } else if (routerName === href) {
            return '#537E9D';
        } else {
            return '';
        }
    };

    const checkRouteBgHover = () => {
        if (subPage) {
            if (router.pathname.split('/')[2] !== undefined) {
                routerName = `${routerName}/${router.pathname.split('/')[2]}`;
            }
            if (routerName === href) {
                return 'rgba(83,126,157,0.8)';
            } else {
                return 'rgba(83,126,157,0.8)';
            }
        } else if (routerName === href) {
            return 'rgba(83,126,157,0.8)';
        } else {
            return 'rgba(83,126,157,0.8)';
        }
    };

    const checkRouteColor = () => {
        if (subPage) {
            if (router.pathname.split('/')[2] !== undefined) {
                routerName = `${routerName}/${router.pathname.split('/')[2]}`;
            }
            if (routerName === href) {
                return 'white';
            } else {
                return '#0D4066';
            }
        } else if (routerName === href) {
            return 'white';
        } else {
            return '#0D4066';
        }
    };

    const checkBoldFont = () => {
        if (subPage) {
            if (router.pathname.split('/')[2] !== undefined) {
                routerName = `${routerName}/${router.pathname.split('/')[2]}`;
            }
            if (routerName === href) {
                return 'bold';
            } else {
                return 500;
            }
        } else if (routerName === href) {
            return 'bold';
        } else {
            return 500;
        }
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Link href={href}>
                    <Grid
                        item
                        sx={{
                            transition: 'background .3s',
                            width: '100%',
                            backgroundColor: checkRouteBg(),
                            '&:hover': {
                                backgroundColor: checkRouteBgHover()
                            },
                            display: render ? '' : 'none',
                            fontWeight: 'bold',
                            borderRadius: '0px 24px 24px 0px'
                        }}
                    >
                        <Button
                            sx={{
                                width: '100%',
                                textTransform: 'none',
                                px: 2,
                                '&:hover': {
                                    color: 'white'
                                },
                                fontSize: '16px',
                                color: checkRouteColor(),
                                fontWeight: checkBoldFont(),
                                borderRadius: '0px 24px 24px 0px'
                            }}
                        >
                            <Grid container direction='row' alignItems='center' sx={{ p: 1 }} spacing={1}>
                                <Grid item>{icon}</Grid>
                                <Grid item>{name}</Grid>
                            </Grid>
                        </Button>
                    </Grid>
                </Link>
            </ThemeProvider>
        </>
    );
};

export default SidebarButton;
