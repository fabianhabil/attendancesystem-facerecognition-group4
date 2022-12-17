import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateLoadingPage } from '../../features/loading/loadingSlice';
import axios from 'axios';
import RegisterFace from '../Register Face/RegisterFace';
import { useState, useEffect } from 'react';
import type userType from '../../types/user/user-type';

const Dashboard = () => {
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState<boolean>(false);

    const fetch = async () => {
        try {
            dispatch(updateLoadingPage({ loading: true }));
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/initialize`);
            if (response) {
                console.log(response);
                dispatch(updateLoadingPage({ loading: false }));
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const data: userType = JSON.parse(localStorage.getItem('data') as string);
        if (data) {
            if (!data.haveModel) {
                setOpenModal(() => true);
            }
        }
    }, [dispatch]);

    return (
        <>
            <RegisterFace openModal={openModal} setOpenModal={setOpenModal} />
            {/* tes */}
            <Button onClick={() => fetch()}>tes</Button>
        </>
    );
};

export default Dashboard;
