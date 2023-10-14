import { CardList } from 'components/PieChart/CardList';
import ClientComponent from '../../components/ClientComponent';
import ServerComponent from '../../components/ServerComponent';
import Sidebar from '../../components/SidebarComponent';
import SchedulePostComponent from '../../components/SchedulePostModal';

const Home = async () => {
    return (
        <main>
            <ClientComponent />
            <ServerComponent />
            <CardList />
            <Sidebar />
        </main>
    );
};

export default Home;
