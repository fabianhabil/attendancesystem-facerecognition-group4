import Head from 'next/head';
import WelcomePage from '../components/Welcome Page/WelcomePage';

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
