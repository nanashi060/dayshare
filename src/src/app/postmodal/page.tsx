import ClientComponent from '../../../components/ClientComponent';
import ServerComponent from '../../../components/ServerComponent';
import Sidebar from '../../../components/SidebarComponent';
import SchedulePostModal from '../../../components/SchedulePostModal';

const postModal = async () => {
    return (
        <>
            <ClientComponent />
            <ServerComponent />
            <SchedulePostModal />
            <Sidebar />
        </>
    );
};

export default postModal;
