import Head from 'next/head';
import dynamic from 'next/dynamic';

const TakeAttendance = dynamic(() => import('../components/Take Attendance/TakeAttendance'), {
    ssr: false
});

const Home = () => {
    return (
        <>
            <Head>
                <title>Attendance | Attendee</title>
            </Head>
            <TakeAttendance />
        </>
    );
};

export default Home;
