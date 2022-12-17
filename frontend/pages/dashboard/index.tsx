import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';
import Layout from '../../components/Layout/Layout/Layout';

const Dashboard = dynamic(() => import('../../components/Dashboard/Dashboard'), {
    ssr: false
});

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
