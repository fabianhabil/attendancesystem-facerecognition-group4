import { AppBar, Grid, ThemeProvider, SwipeableDrawer, Menu, MenuItem, IconButton, Container, Toolbar } from '@mui/material';
import theme from '../../../theme/theme';
import { useDispatch } from 'react-redux';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';
// import SideBarContent from '../../../molecules/layout/sidebar/sidebar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Sidebar from '../Sidebar/Sidebar';
import { resetUserInfo } from '../../../features/userInfo/userInfoSlice';
// import Link from 'next/link';
import { useRouter } from 'next/router';
import ToastSuccess from '../../Toast/ToastSuccess';

const Navbar = () => {
    const [drawer, setDrawer] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        localStorage.removeItem('data');
        dispatch(resetUserInfo());
        router.push('/');
        ToastSuccess('Logout Success!');
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <AppBar
                    position='sticky'
                    elevation={0}
                    sx={{
                        backgroundColor: 'white',
                        color: 'black',
                        // borderBottom: '2px solid #D9D9D9',
                        mb: 2
                    }}
                >
                    <Toolbar>
                        <Grid container direction='row-reverse' alignItems='center' justifyContent='space-between'>
                            <Grid
                                item
                                sx={{
                                    '@media (min-width: 415px)': {
                                        display: 'none'
                                    }
                                }}
                            >
                                <IconButton
                                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                        handleClickMenu(e);
                                    }}
                                    sx={{ m: 0, p: 0 }}
                                >
                                    <KeyboardArrowDownIcon
                                        sx={{
                                            fontSize: '32px',
                                            verticalAlign: 'middle',
                                            p: 0,
                                            m: 0,
                                            '&:hover': {
                                                cursor: 'pointer'
                                            },
                                            color: 'black'
                                        }}
                                    />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <Grid container spacing={1} alignItems='center'>
                                    <Grid item>
                                        <IconButton
                                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                                handleClickMenu(e);
                                            }}
                                            sx={{
                                                m: 0,
                                                p: 0,
                                                '@media (max-width: 415px)': {
                                                    display: 'none'
                                                }
                                            }}
                                        >
                                            <KeyboardArrowDownIcon
                                                sx={{
                                                    fontSize: '32px',
                                                    verticalAlign: 'middle',
                                                    p: 0,
                                                    m: 0,
                                                    '&:hover': {
                                                        cursor: 'pointer'
                                                    },
                                                    color: 'black'
                                                }}
                                            />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ display: { xs: 'block', lg: 'none' } }}>
                                <MenuIcon
                                    sx={{
                                        fontSize: '32px',
                                        verticalAlign: 'middle',
                                        p: 0,
                                        m: 0,
                                        '&:hover': {
                                            cursor: 'pointer'
                                        }
                                    }}
                                    onClick={() => {
                                        setDrawer(true);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>

                {/* Drawer mobile */}
                <SwipeableDrawer
                    anchor='left'
                    open={drawer}
                    onClose={() => {
                        setDrawer(false);
                    }}
                    onOpen={() => {
                        setDrawer(true);
                    }}
                >
                    <Sidebar />
                </SwipeableDrawer>
                <div>
                    <Menu
                        id='basic-menu'
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseMenu}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button'
                        }}
                    >
                        <MenuItem
                            onClick={() => {
                                logout();
                            }}
                        >
                            Logout
                        </MenuItem>
                    </Menu>
                </div>
                {/* <EditProfile open={openModal} handleClose={setOpenModal} /> */}
            </ThemeProvider>
        </>
    );
};

export default Navbar;
