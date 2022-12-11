import { Button, Grid, Typography } from '@mui/material';
import { MdOutlineLogin, MdOutlineAssignment } from 'react-icons/md';
import { FiUserCheck } from 'react-icons/fi';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

const ButtonMenu = ({ title, onClick, icon }: { title: string; onClick: () => void; icon: ReactNode }) => {
    return (
        <Button
            sx={{
                borderRadius: '32px',
                backgroundColor: 'white',
                width: '200px',
                '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.7)'
                },
                textTransform: 'none',
                verticalAlign: 'middle',
                textAlign: 'center',
                color: 'black'
            }}
            onClick={onClick}
        >
            {icon}
            <Typography
                sx={{
                    color: '#0D4066',
                    fontWeight: 'bold',
                    fontSize: '20px'
                }}
            >
                {title}
            </Typography>
        </Button>
    );
};

const WelcomePage = () => {
    const router = useRouter();

    return (
        <>
            <Grid container direction='column'>
                <Grid item>
                    <Grid
                        container
                        direction='column'
                        alignItems='center'
                        justifyContent='space-between'
                        sx={{ minHeight: '60vh', p: 3, backgroundColor: '#C0D5E6' }}
                    >
                        <Grid item />
                        <Grid item>
                            <img src='/logo/logo.png' alt='logo' style={{ maxWidth: '250px', width: '100%' }} />
                        </Grid>
                        <Grid item>
                            <Typography
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: { md: '32px', xs: '24px' },
                                    textAlign: 'center',
                                    pb: 1
                                }}
                            >
                                Hello, Welcome to Attendee
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    direction='column'
                    alignItems='center'
                    justifyContent='center'
                    sx={{ backgroundColor: '#84A8BF', minHeight: '40vh' }}
                >
                    <Grid container direction='column' alignItems='center' justifyContent='center' spacing={4}>
                        <Grid item>
                            <ButtonMenu
                                title='Sign in'
                                onClick={() => router.push('/login')}
                                icon={
                                    <MdOutlineLogin
                                        style={{ color: 'black', marginRight: 4, fontSize: '20px', fontWeight: 'bold' }}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item>
                            <ButtonMenu
                                title='Register'
                                onClick={() => console.log('sign in')}
                                icon={
                                    <MdOutlineAssignment
                                        style={{ color: 'black', marginRight: 4, fontSize: '20px', fontWeight: 'bold' }}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item>
                            <ButtonMenu
                                title='Attendance'
                                onClick={() => router.push('/attendance')}
                                icon={
                                    <FiUserCheck
                                        style={{ color: 'black', marginRight: 4, fontSize: '20px', fontWeight: 'bold' }}
                                    />
                                }
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default WelcomePage;
