import Head from 'next/head';
import React from 'react';
import Layout from '../../components/Layout/Layout/Layout';
import Lecturer from '../../components/Lecturer/Lecturer';

const Home = () => {
    return (
        <>
            <Head>
                <title>Lecturer | Attendee</title>
            </Head>
            <Lecturer />
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
