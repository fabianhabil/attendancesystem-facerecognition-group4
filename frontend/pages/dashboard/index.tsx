import Head from 'next/head';
import React from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import Layout from '../../components/Layout/Layout/Layout';

const Home = () => {
    return (
        <>
            <Head>
                <title>Dashboard | Attendee</title>
            </Head>
            <Dashboard />
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
