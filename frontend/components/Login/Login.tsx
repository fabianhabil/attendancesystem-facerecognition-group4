import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import { Button, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { textFieldStyles } from '../Micros/Textfield/Textfield';
import ToastError from '../Toast/ToastError';
import ToastSuccess from '../Toast/ToastSuccess';
import { useRouter } from 'next/router';

const LoginPage = () => {
    const styles = textFieldStyles();
    const [login, setLogin] = useState<{ email: string; password: string }>({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const handleClickPassword = () => setShowPassword(!showPassword);
    const router = useRouter();

    const loginAccount = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/`, login);
            if (response) {
                console.log(response);
                localStorage.setItem('data', JSON.stringify(response.data.user));
                ToastSuccess('Login Success!');
                router.push('/');
            }
        } catch (e: any) {
            console.log(e);
            if (e.response.status === 401) {
                ToastError('Invalid Email or Password!');
            } else if (e.response.status === 400) {
                ToastError('Email and Password cannot be empty!');
            } else {
                ToastError('Server Error!');
            }
        }
    };

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('data') as string);
        if (data) {
            const notice = 'Already Logged in!';
            ToastError(notice);
            setTimeout(() => {
                router.push('/');
            }, 500);
        }
    }, []);

    return (
        <>
            <Grid
                container
                sx={{ minHeight: '100vh', backgroundColor: '#C0D5E6' }}
                alignItems='center'
                justifyContent='center'
            >
                <Grid item xs={12} md={'auto'} sm={8} sx={{ p: 2 }}>
                    <Grid container direction='column' spacing={1}>
                        <Grid item container alignItems='center' justifyContent='center'>
                            <img
                                src='/logo/logo.png'
                                alt='logo'
                                style={{ maxWidth: '190px', width: '100%', height: 'auto' }}
                            />
                        </Grid>
                        <Grid item>
                            <Typography
                                sx={{ color: '#0D4066', fontSize: '48px', textAlign: 'center', fontWeight: 'bold' }}
                            >
                                Sign In
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            container
                            direction='column'
                            spacing={2}
                            sx={{ minWidth: { xs: '100%', md: '500px' } }}
                        >
                            <Grid item>
                                <TextField
                                    fullWidth
                                    label={
                                        <>
                                            <EmailIcon sx={{ fontSize: '24px', mr: '8px' }} /> {' Email Address'}
                                        </>
                                    }
                                    variant='outlined'
                                    onChange={(e) => {
                                        setLogin({ ...login, email: e.target.value });
                                    }}
                                    InputLabelProps={{
                                        style: { color: '#0D4066', borderColor: 'white', fontWeight: 'bold' }
                                    }}
                                    onKeyPress={(e) => {
                                        if (e.which === 13) {
                                            loginAccount();
                                        }
                                    }}
                                    className={styles.inputTextfield}
                                    sx={{
                                        input: { color: '#0D4066', fontWeight: 'bold' },
                                        '& label': {
                                            opacity: !login.email ? 1 : 0,
                                            '&.Mui-focused': {
                                                opacity: 0,
                                                display: 'none'
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    label={
                                        <>
                                            <Lock sx={{ fontSize: '24px', mr: '8px' }} /> {' Password'}
                                        </>
                                    }
                                    autoComplete='off'
                                    variant='outlined'
                                    type={showPassword ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton onClick={handleClickPassword} sx={{ color: '#0D4066' }}>
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    onKeyPress={(e) => {
                                        if (e.which === 13) {
                                            loginAccount();
                                        }
                                    }}
                                    onChange={(e) => {
                                        setLogin({ ...login, password: e.target.value });
                                    }}
                                    InputLabelProps={{
                                        style: { color: '#0D4066', borderColor: 'white', fontWeight: 'bold' }
                                    }}
                                    className={styles.inputTextfield}
                                    sx={{
                                        input: { color: '#0D4066', fontWeight: 'bold' },
                                        '& label': {
                                            opacity: !login.password ? 1 : 0,
                                            color: 'red',
                                            '&.Mui-focused': {
                                                opacity: 0,
                                                display: 'none'
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    sx={{
                                        width: '100%',
                                        backgroundColor: '#84A8BF',
                                        color: 'black',
                                        textTransform: 'none',
                                        borderRadius: '18px',
                                        height: '50px',
                                        '&:hover': {
                                            backgroundColor: 'rgba(132,168,191,0.7)'
                                        }
                                    }}
                                    onClick={loginAccount}
                                >
                                    <Typography sx={{ fontSize: '20px', fontWeight: 600, color: 'white' }}>
                                        Login
                                    </Typography>
                                </Button>
                            </Grid>
                            <Grid
                                item
                                container
                                direction='row'
                                justifyContent='space-between'
                                alignItems='center'
                                sx={{
                                    '@media (max-width:371px)': {
                                        justifyContent: 'center'
                                    },
                                    '@media (max-width:950px) and (min-width:900px)': {
                                        justifyContent: 'center'
                                    }
                                }}
                            >
                                <Grid item>
                                    <Link href='/register'>
                                        <Typography
                                            sx={{
                                                fontSize: '14px',
                                                textAlign: 'center',
                                                '&:hover': {
                                                    cursor: 'pointer',
                                                    color: 'gray'
                                                }
                                            }}
                                        >
                                            Don't have an account?
                                        </Typography>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default LoginPage;
