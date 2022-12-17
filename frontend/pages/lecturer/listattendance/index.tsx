import Head from 'next/head';
import React from 'react';
import CheckAttendance from '../../../components/Lecturer/Check Attendance/CheckAttendance';
import Layout from '../../../components/Layout/Layout/Layout';

const Home = () => {
    return (
        <>
            <Head>
                <title>List Attendance | Attendee</title>
            </Head>
            <CheckAttendance />
        </>
    );
};

Home.getLayout = function getLayout(page: React.ReactNode) {
    return (
        <>
            <Layout>{page}</Layout>
        </>
    );
};

export default Home;
