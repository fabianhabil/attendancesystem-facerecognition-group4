import Head from 'next/head';
import WelcomePage from '../components/Welcome Page/WelcomePage';
// import dynamic from 'next/dynamic';

// const Webcam = dynamic(() => import('../components/Webcam/Webcam'), {
//     ssr: false
// });

const Home = () => {
    return (
        <>
            <Head>
                <title>Attendee</title>
            </Head>
            <WelcomePage />
        </>
    );
};

export default Home;
