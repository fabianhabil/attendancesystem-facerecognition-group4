import { Grid, Toolbar, Drawer } from '@mui/material';
import React from 'react';
import SidebarButton from './SidebarButton/SidebarButton';
import Link from 'next/link';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Groups2Icon from '@mui/icons-material/Groups2';
import DashboardIcon from '@mui/icons-material/Dashboard';
import type { ReactNode } from 'react';

const drawerWidth = 240;

interface menuProps {
    name: string;
    icon?: ReactNode;
    href: string;
    subPage?: boolean;
    admin?: boolean;
}

const menu: menuProps[] = [
    {
        name: 'Dashboard',
        icon: <DashboardIcon sx={{ fontSize: '32px', verticalAlign: 'middle' }} />,
        href: '/dashboard',
        admin: false
    },
    // {
    //     name: 'Schedule',
    //     icon: <CalendarMonthIcon sx={{ fontSize: '32px', verticalAlign: 'middle' }} />,
    //     href: '/schedule',
    //     admin: false
    // },
    {
        name: 'Attendance',
        icon: <Groups2Icon sx={{ fontSize: '32px', verticalAlign: 'middle' }} />,
        href: '/attendance',
        admin: false
    }
];

const Sidebar = () => {
    return (
        <>
            <Drawer
                variant='permanent'
                anchor='left'
                sx={{
                    width: `${drawerWidth}px`,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        backgroundColor: 'white',
                        width: `${drawerWidth}px`,
                        boxSizing: 'border-box',
                        border: 0
                    }
                    // borderRight: '1px solid #D9D9D9'
                }}
                elevation={0}
            >
                <Grid
                    container
                    direction='column'
                    sx={{
                        height: '100%',
                        // borderRight: { md: '2px solid #D9D9D9', sm: '2px solid #D9D9D9', xs: 'none' },
                        backgroundColor: '#C0D5E6'
                    }}
                >
                    <Grid
                        item
                        container
                        alignItems='center'
                        justifyContent='center'
                        sx={{
                            py: 1,
                            '&:hover': {
                                cursor: 'pointer'
                            },
                            backgroundColor: '#244350',
                            mb: 2
                        }}
                    >
                        <Toolbar>
                            <Link href='/dashboard' passHref>
                                <div>
                                    <img
                                        alt='logo'
                                        src='/logo/logobinus.png'
                                        style={{
                                            maxWidth: '170px',
                                            width: '100%',
                                            maxHeight: '75px',
                                            height: '100%'
                                        }}
                                    />
                                </div>
                            </Link>
                        </Toolbar>
                    </Grid>
                    <Grid item container direction='column' sx={{ backgroundColor: '#C0D5E6' }}>
                        {menu.map((data: menuProps, index: number) => {
                            return (
                                <React.Fragment key={index}>
                                    <SidebarButton
                                        name={data.name}
                                        icon={data.icon}
                                        href={data.href}
                                        subPage={data.subPage}
                                        admin={data.admin}
                                    />
                                </React.Fragment>
                            );
                        })}
                    </Grid>
                </Grid>
            </Drawer>
        </>
    );
};

export default Sidebar;
