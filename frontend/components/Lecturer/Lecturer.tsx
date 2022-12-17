import { Button, Grid } from '@mui/material';
import { useRouter } from 'next/router';

const Lecturer = () => {
    const router = useRouter();

    return (
        <>
            <Grid container direction='row' justifyContent='space-between' spacing={2}>
                <Grid item xs={6}>
                    <Grid container justifyContent='center'>
                        <Grid item xs={12}>
                            <Button
                                sx={{
                                    width: '100%',
                                    fontSize: '20px',
                                    backgroundColor: '#537E9D',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'rgb(83,126,157,0.7)'
                                    }
                                }}
                                onClick={() => router.push('/lecturer/addcourse')}
                            >
                                Create new course
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container justifyContent='center'>
                        <Grid item xs={12}>
                            <Button
                                sx={{
                                    width: '100%',
                                    fontSize: '20px',
                                    backgroundColor: '#537E9D',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'rgb(83,126,157,0.7)'
                                    }
                                }}
                                onClick={() => router.push('/lecturer/listattendance')}
                            >
                                Check attendance
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Lecturer;
