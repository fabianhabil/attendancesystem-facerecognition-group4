import { Button, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import ToastError from '../Toast/ToastError';
import ToastSuccess from '../Toast/ToastSuccess';

const AddCourse = () => {
    const [courseData, setCourseData] = useState<{ name: string; sks: string }>({ name: '', sks: '' });

    const postCourse = async () => {
        try {
            const data = new FormData();
            data.append('name', courseData.name);
            data.append('sks', courseData.sks);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/createCourse`, data);
            if (response) {
                ToastSuccess('Course Added!');
            }
        } catch (e) {
            console.log(e);
            ToastError('Server Error!');
        }
    };

    return (
        <>
            <Grid container direction='column' spacing={3}>
                <Grid item>
                    <Typography sx={{ fontSize: '48px' }}>Add Course</Typography>
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        defaultValue={courseData.name}
                        label='Course Name'
                        sx={{
                            color: 'black',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    border: '1px solid black'
                                }
                            }
                        }}
                        InputLabelProps={{
                            style: { color: courseData.name ? 'black' : 'rgba(0, 0, 0, 0.5)', borderColor: 'black' }
                        }}
                        onChange={(e) => {
                            setCourseData((state) => ({ ...state, name: e.target.value }));
                        }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        defaultValue={courseData.sks}
                        label='SKS'
                        sx={{
                            color: 'black',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    border: '1px solid black'
                                }
                            }
                        }}
                        InputLabelProps={{
                            style: { color: courseData.sks ? 'black' : 'rgba(0, 0, 0, 0.5)', borderColor: 'black' }
                        }}
                        onChange={(e) => {
                            setCourseData((state) => ({ ...state, sks: e.target.value }));
                        }}
                    />
                </Grid>
                <Grid item>
                    <Button
                        sx={{
                            width: '100%',
                            fontSize: '18px',
                            backgroundColor: '#537E9D',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'rgb(83,126,157,0.7)'
                            }
                        }}
                        onClick={postCourse}
                    >
                        Add Course
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default AddCourse;
