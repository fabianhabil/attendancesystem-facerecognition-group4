import Head from 'next/head';
import dynamic from 'next/dynamic';

const Test = dynamic(() => import('../components/test'), {
    ssr: false
});

const Home = () => {
    return (
        <>
            <Head>
                <title>tesrt</title>
            </Head>
            <Test />
        </>
    );
};

export default Home;
