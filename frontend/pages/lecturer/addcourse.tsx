import Head from 'next/head';
import React from 'react';
import AddCourse from '../../components/Add Course/AddCourse';
import Layout from '../../components/Layout/Layout/Layout';

const Home = () => {
    return (
        <>
            <Head>
                <title>Add COurse | Attendee</title>
            </Head>
            <AddCourse />
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
