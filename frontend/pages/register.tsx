import Head from 'next/head';
import RegisterPage from '../components/Register/Register';

const Home = () => {
    return (
        <>
            <Head>
                <title>Register | Attendee</title>
            </Head>
            <RegisterPage />
        </>
    );
};

export default Home;
