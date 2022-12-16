import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import { Button, FormHelperText, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { textFieldStyles } from '../Micros/Textfield/Textfield';
import { FaIdCard } from 'react-icons/fa';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ToastError from '../Toast/ToastError';
import axios from 'axios';
import ToastSuccess from '../Toast/ToastSuccess';
import { useRouter } from 'next/router';

const RegisterPage = () => {
    const styles = textFieldStyles();
    const [register, setRegister] = useState<{
        email: string;
        password: string;
        confirmPassword: string;
        nim: string;
        fullname: string;
    }>({
        email: '',
        password: '',
        confirmPassword: '',
        nim: '',
        fullname: ''
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPassword2, setShowPassword2] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const router = useRouter();

    const validateEmail = (email: string) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleClickPassword = () => setShowPassword(!showPassword);
    const handleClickPassword2 = () => setShowPassword2(!showPassword2);

    const registerAccount = async () => {
        if (
            validateEmail(register.email) &&
            register.password === register.confirmPassword &&
            register.nim !== '' &&
            register.fullname !== ''
        ) {
            setError(false);
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register/`, register);
                if (response) {
                    console.log(response);
                    ToastSuccess('Register Berhasil!');
                    router.push('/');
                }
            } catch (e: any) {
                console.log(e);
                if (e.response.status === 400) {
                    if (e.response.data.email) {
                        ToastError('Email Registered! Please use another Email');
                    }
                    if (e.response.data.nim) {
                        ToastError('NIM Registered! Please use another NIM');
                    }
                }
            }
        } else {
            setError(true);
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
                                Register
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
                                            <AccountBoxIcon sx={{ fontSize: '24px', mr: '8px' }} /> {' Full Name'}
                                        </>
                                    }
                                    variant='outlined'
                                    onChange={(e) => {
                                        setRegister({ ...register, fullname: e.target.value });
                                    }}
                                    InputLabelProps={{
                                        style: { color: '#0D4066', borderColor: 'white', fontWeight: 'bold' }
                                    }}
                                    onKeyPress={(e) => {
                                        if (e.which === 13) {
                                            // registerAccount(register);
                                        }
                                    }}
                                    error={error && register.fullname === ''}
                                    className={styles.inputTextfield}
                                    sx={{
                                        input: { color: '#0D4066', fontWeight: 'bold' },
                                        '& label': {
                                            opacity: !register.fullname ? 1 : 0,
                                            '&.Mui-focused': {
                                                opacity: 0,
                                                display: 'none'
                                            }
                                        }
                                    }}
                                    aria-describedby='fullname'
                                />
                                <FormHelperText id='fullname' sx={{ color: 'red', ml: 1.5 }}>
                                    {error && register.fullname === '' ? 'Fullname cannot be empty!' : ''}
                                </FormHelperText>
                            </Grid>
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
                                        setRegister({ ...register, email: e.target.value });
                                    }}
                                    InputLabelProps={{
                                        style: { color: '#0D4066', borderColor: 'white', fontWeight: 'bold' }
                                    }}
                                    onKeyPress={(e) => {
                                        if (e.which === 13) {
                                            // registerAccount(register);
                                        }
                                    }}
                                    error={error && !validateEmail(register.email)}
                                    className={styles.inputTextfield}
                                    sx={{
                                        input: { color: '#0D4066', fontWeight: 'bold' },
                                        '& label': {
                                            opacity: !register.email ? 1 : 0,
                                            '&.Mui-focused': {
                                                opacity: 0,
                                                display: 'none'
                                            }
                                        }
                                    }}
                                    aria-describedby='email'
                                />
                                <FormHelperText id='email' sx={{ color: 'red', ml: 1.5 }}>
                                    {error && !validateEmail(register.email) ? 'Format Email not correct!' : ''}
                                </FormHelperText>
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    label={
                                        <>
                                            <FaIdCard style={{ fontSize: '22px', marginRight: '8px' }} />{' '}
                                            {' Student ID'}
                                        </>
                                    }
                                    variant='outlined'
                                    onChange={(e) => {
                                        setRegister({ ...register, nim: e.target.value });
                                    }}
                                    InputLabelProps={{
                                        style: { color: '#0D4066', borderColor: 'white', fontWeight: 'bold' }
                                    }}
                                    onKeyPress={(e) => {
                                        if (e.which === 13) {
                                            // registerAccount(register);
                                        }
                                    }}
                                    error={error && register.nim === ''}
                                    className={styles.inputTextfield}
                                    sx={{
                                        input: { color: '#0D4066', fontWeight: 'bold' },
                                        '& label': {
                                            opacity: !register.nim ? 1 : 0,
                                            '&.Mui-focused': {
                                                opacity: 0,
                                                display: 'none'
                                            }
                                        }
                                    }}
                                />
                                <FormHelperText id='nim' sx={{ color: 'red', ml: 1.5 }}>
                                    {error && register.nim === '' ? 'NIM cannot be empty!' : ''}
                                </FormHelperText>
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
                                            // registerAccount(register);
                                        }
                                    }}
                                    onChange={(e) => {
                                        setRegister({ ...register, password: e.target.value });
                                    }}
                                    InputLabelProps={{
                                        style: { color: '#0D4066', borderColor: 'white', fontWeight: 'bold' }
                                    }}
                                    className={styles.inputTextfield}
                                    sx={{
                                        input: { color: '#0D4066', fontWeight: 'bold' },
                                        '& label': {
                                            opacity: !register.password ? 1 : 0,
                                            color: 'red',
                                            '&.Mui-focused': {
                                                opacity: 0,
                                                display: 'none'
                                            }
                                        }
                                    }}
                                    aria-describedby='password'
                                />
                                <FormHelperText id='password' sx={{ color: 'red', ml: 1.5 }}>
                                    {error && register.password === ''
                                        ? "Password can't be empty!"
                                        : register.password !== register.confirmPassword
                                        ? 'Password Not Match!'
                                        : ''}
                                </FormHelperText>
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    label={
                                        <>
                                            <Lock sx={{ fontSize: '24px', mr: '8px' }} /> {' Confirm Password'}
                                        </>
                                    }
                                    autoComplete='off'
                                    variant='outlined'
                                    type={showPassword2 ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton onClick={handleClickPassword2} sx={{ color: '#0D4066' }}>
                                                    {showPassword2 ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    onKeyPress={(e) => {
                                        if (e.which === 13) {
                                            // registerAccount(register);
                                        }
                                    }}
                                    onChange={(e) => {
                                        setRegister({ ...register, confirmPassword: e.target.value });
                                    }}
                                    InputLabelProps={{
                                        style: { color: '#0D4066', borderColor: 'white', fontWeight: 'bold' }
                                    }}
                                    className={styles.inputTextfield}
                                    sx={{
                                        input: { color: '#0D4066', fontWeight: 'bold' },
                                        '& label': {
                                            opacity: !register.confirmPassword ? 1 : 0,
                                            color: 'red',
                                            '&.Mui-focused': {
                                                opacity: 0,
                                                display: 'none'
                                            }
                                        }
                                    }}
                                    aria-describedby='confirm-password'
                                />
                                <FormHelperText id='confirm-password' sx={{ color: 'red', ml: 1.5 }}>
                                    {error && register.confirmPassword === ''
                                        ? "Password can't be empty!"
                                        : register.password !== register.confirmPassword
                                        ? 'Password Not Match!'
                                        : ''}
                                </FormHelperText>
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
                                    onClick={registerAccount}
                                >
                                    <Typography sx={{ fontSize: '20px', fontWeight: 600, color: 'white' }}>
                                        Register
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
                                    <Link href='/login'>
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
                                            Already have an account?
                                        </Typography>
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href='/forgot'>
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
                                            Forgot your password?
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

export default RegisterPage;
