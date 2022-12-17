import Head from 'next/head';
import React from 'react';
import CheckAttendanceCourse from '../../../components/Lecturer/Check Attendance/CheckAttendanceCourse';
import Layout from '../../../components/Layout/Layout/Layout';

const Home = () => {
    return (
        <>
            <Head>
                <title>List Attendance | Attendee</title>
            </Head>
            <CheckAttendanceCourse />
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
