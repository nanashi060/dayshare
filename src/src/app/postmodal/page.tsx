import ClientComponent from '../../../components/ClientComponent';
import ServerComponent from '../../../components/ServerComponent';
import Sidebar from '../../../components/SidebarComponent';
import SchedulePostModal from '../../../components/SchedulePostModal';
import { CardList } from 'components/PieChart/CardList';
import { Header } from 'components/header';

const postModal = async () => {
    return (
        <>
            <ClientComponent />
            <ServerComponent />
            <SchedulePostModal />
            <div className="flex">
                <Sidebar />
                <div className="mx-auto w-[70%]">
                    <Header />
                    <CardList />
                </div>
            </div>
        </>
    );
};

export default postModal;
