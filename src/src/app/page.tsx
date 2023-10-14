import { CardList } from 'components/PieChart/CardList';
import ClientComponent from '../../components/ClientComponent';
import ServerComponent from '../../components/ServerComponent';
import Sidebar from '../../components/SidebarComponent';
import { Header } from '../../../src/components/header';
import SchedulePostComponent from '../../components/SchedulePostModal';

const Home = async () => {
    return (
        <main>
            <ClientComponent />
            <ServerComponent />
            <div className="flex">
                <Sidebar />
                <div className='mx-auto w-[70%]'>
                    <Header />
                    <CardList />
                </div>
            </div>
        </main>
    );
};

export default Home;
