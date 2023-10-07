import ClientComponent from '../../components/ClientComponent';
import ServerComponent from '../../components/ServerComponent';
import TestComponent from '../../components/test';
import Sidebar from '../../components/SidebarComponent';
import SchedulePostComponent from '../../components/SchedulePostModal';

const Home = async () => {
    return (
        <main>
            <ClientComponent />
            <ServerComponent />
            <TestComponent />
            <Sidebar />
            <SchedulePostComponent />
        </main>
    );
};

export default Home;
