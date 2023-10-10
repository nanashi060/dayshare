import ClientComponent from '../../components/ClientComponent';
import ServerComponent from '../../components/ServerComponent';
import Sidebar from '../../components/SidebarComponent';

const Home = async () => {
    return (
        <main>
            <ClientComponent />
            <ServerComponent />
            <Sidebar />
        </main>
    );
};

export default Home;
