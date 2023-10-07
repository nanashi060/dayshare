import ClientComponent from '../../components/ClientComponent';
import ServerComponent from '../../components/ServerComponent';
import TestComponent from '../../components/test';
import Sidebar from '../../components/SidebarComponent';
import './globals.css';

const Home = async () => {
    return (
        <main>
            <ClientComponent />
            <ServerComponent />
            <TestComponent />
            <Sidebar />
        </main>
    );
};

export default Home;
