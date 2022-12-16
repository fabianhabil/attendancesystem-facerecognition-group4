import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateLoadingPage } from '../../features/loading/loadingSlice';
import axios from 'axios';

const Dashboard = () => {
    const dispatch = useDispatch();
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

    return (
        <>
            {/* tes */}
            <Button onClick={() => fetch()}>tes</Button>
        </>
    );
};

export default Dashboard;
