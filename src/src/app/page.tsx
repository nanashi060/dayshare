import ClientComponent from '../../components/ClientComponent';
import ServerComponent from '../../components/ServerComponent';
import TestComponent from '../../components/test';
import SchduleModalComponent from '../../components/SchedulePostModal';
import './globals.css';

const Home = async () => {
    return (
        <main>
            <ClientComponent />
            <ServerComponent />
            <SchduleModalComponent />
            <TestComponent />
        </main>
    );
};

export default Home;
