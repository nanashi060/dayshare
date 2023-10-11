import ClientComponent from '../../components/ClientComponent';
import ServerComponent from '../../components/ServerComponent';
import Sidebar from '../../components/SidebarComponent';
import SchedulePostComponent from '../../components/SchedulePostModal';
import { useState } from 'react';
import Detail from 'components/PostDetail/Detail';
import PostDetail from 'components/PostDetail/PostDetail';

const Home = async () => {
    return (
        <main>
            <ClientComponent />
            <ServerComponent />
            {/* <Sidebar /> */}
            <PostDetail />
        </main>
    );
};

export default Home;
