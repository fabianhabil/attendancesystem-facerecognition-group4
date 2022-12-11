import Head from 'next/head';
import LoginPage from '../components/Login/Login';

const Home = () => {
    return (
        <>
            <Head>
                <title>Login | Attendee</title>
            </Head>
            <LoginPage />
        </>
    );
};

export default Home;
