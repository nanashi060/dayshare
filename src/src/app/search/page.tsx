'use client';

import Sidebar from '../../../components/SidebarComponent';
import ClientComponent from '../../../components/ClientComponent';
import ServerComponent from '../../../components/ServerComponent';
import { Searchbox } from 'components/Search/SearchboxComponent';

const search = () => {
    return (
        <div className="flex">
            <ClientComponent />
            <ServerComponent />
            <Sidebar />
            <Searchbox />
        </div>
    );
};

export default search;
