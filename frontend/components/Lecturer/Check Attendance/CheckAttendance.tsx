import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ButtonListCourse from './ButtonListCourse';

const CheckAttendance = () => {
    const [course, setCourse] = useState<{ name: string; sks: number; id: number }[]>([]);

    const fetch = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/getCourse`);
            if (response) setCourse(response.data.course);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    return (
        <>
            <Grid container direction='column' spacing={2}>
                <Grid item>
                    <Typography sx={{ fontSize: '36px', fontWeight: 'bold', ml: -0.8 }}>Check Attendance</Typography>
                </Grid>
                <Grid item>
                    <Grid container direction='column' spacing={2}>
                        {course.length === 0 ? (
                            <>
                                <Grid item>
                                    <Typography sx={{ fontSize: '36px', fontWeight: 'bold', textAlign: 'center' }}>
                                        No Course available
                                    </Typography>
                                </Grid>
                            </>
                        ) : (
                            <>
                                {course.map((data, index) => {
                                    return <ButtonListCourse data={data} key={index} index={index} />;
                                })}
                            </>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default CheckAttendance;
