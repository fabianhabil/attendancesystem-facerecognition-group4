import Head from 'next/head';
import dynamic from 'next/dynamic';

const Webcam = dynamic(() => import('../components/Webcam/Webcam'), {
    ssr: false
});

const Home = () => {
    return (
        <>
            <Head>
                <title>Attendance | Attendee</title>
            </Head>
            <Webcam />
        </>
    );
};

export default Home;
