import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { updateAttendanceLecture } from '../../../features/attendanceLecture/attendanceLectureSlice';

const ButtonListCourse = ({ index, data }: { index: number; data: { name: string; sks: number; id: number } }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    return (
        <>
            <Grid item sx={{ pt: index === 0 ? 0 : 1, pb: 1 }}>
                <Grid
                    container
                    direction='column'
                    sx={{
                        borderBottom: '1px solid #C4C4C4',
                        pb: data.name === 'Frames' ? 0 : 1
                    }}
                    spacing={1}
                >
                    <Grid item>
                        <Typography sx={{ fontSize: { md: '20px', xs: '18px' }, fontWeight: 'bold' }}>
                            {data.name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Grid container direction='row' justifyContent='space-between'>
                            <Grid item>
                                <Grid container direction='column' spacing={0}>
                                    <Grid item>
                                        <Typography
                                            sx={{
                                                fontSize: { md: '18px', xs: '14px', sm: '16px' }
                                            }}
                                        >
                                            {data.sks} SKS
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography
                                    sx={{
                                        fontSize: { md: '18px', xs: '14px' },
                                        color: 'rgba(28,145,210,1)',
                                        '&:hover': {
                                            cursor: 'pointer',
                                            color: 'rgba(28,145,210,0.7)'
                                        }
                                    }}
                                    // onClick={() => {
                                    //     dispatch(setEventInfo({ event: data }));
                                    //     router.push(`/gallery/${data.config.url}`);
                                    // }}
                                    onClick={() => {
                                        dispatch(updateAttendanceLecture({ lecture: data.name }));
                                        router.push(`/lecturer/listattendance/${data.id}`);
                                    }}
                                >
                                    View
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default ButtonListCourse;
