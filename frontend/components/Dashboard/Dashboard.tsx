import { Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useState, useEffect } from 'react';
import type userType from '../../types/user/user-type';
import dynamic from 'next/dynamic';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import type { globalState } from '../../types/redux/redux-type';
import { useRouter } from 'next/router';
import ListAttendance from './List Attendance/ListAttendance';

const RegisterFace = dynamic(() => import('../Register Face/RegisterFace'), {
    ssr: false
});

const Dashboard = () => {
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [imageData, setImageData] = useState<string>('');
    const userInfo = useSelector((state: globalState) => state.userInfo);
    const router = useRouter();

    const getImage = async () => {
        try {
            const data: userType = JSON.parse(localStorage.getItem('data') as string);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/getImage`, { userId: data.id });
            if (response) {
                setImageData(response.data.image_data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const data: userType = JSON.parse(localStorage.getItem('data') as string);
        if (data) {
            if (data.is_superuser === false) {
                if (!data.haveModel) {
                    setOpenModal(() => true);
                } else {
                    getImage();
                }
            } else {
                router.push('/lecturer');
            }
        }
    }, [dispatch]);

    return (
        <>
            {openModal && <RegisterFace openModal={openModal} setOpenModal={setOpenModal} />}
            <Grid container direction='column'>
                {userInfo.fullname ? (
                    <Grid item sx={{ backgroundColor: '#DBE4EC', borderRadius: '8px', p: 2 }}>
                        <Grid container direction='row' spacing={2}>
                            <Grid item>
                                {imageData !== '' ? (
                                    <img
                                        src={`data:image/jpeg;base64,${imageData}`}
                                        alt='image'
                                        style={{ borderRadius: '50%', width: '180px', height: '180px' }}
                                    />
                                ) : (
                                    <>
                                        <AccountCircleIcon
                                            style={{ borderRadius: '50%', width: '180px', height: '180px' }}
                                        />
                                    </>
                                )}
                            </Grid>
                            <Grid item>
                                <Grid container direction='column' justifyContent='space-between'>
                                    <Grid item>
                                        <Typography sx={{ fontSize: '30px', fontWeight: 'bold', color: '#0D4066' }}>
                                            {userInfo.fullname}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography sx={{ fontSize: '26px', fontWeight: 600, color: '#0D4066' }}>
                                            {userInfo.nim}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography sx={{ fontSize: '26px', fontWeight: 600, color: '#0D4066' }}>
                                            Computer Science
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography sx={{ fontSize: '26px', fontWeight: 600, color: '#0D4066' }}>
                                            School Of Computer Science
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                ) : null}
                <Grid item>
                    <ListAttendance />
                </Grid>
            </Grid>
        </>
    );
};

export default Dashboard;
