'use client';

import SessionProvider from '../../provider/SessionProvider';
import '../../src/app/globals.css';
import { useRouter } from 'next/router';
import { SearchCardList } from '../../components/Search/SearchCardList';
import Sidebar from '../../components/SidebarComponent';
import { Searchbox } from 'components/Search/SearchboxComponent';
import ClientComponent from '../../components/ClientComponent';
import ServerComponent from '../../components/ServerComponent';

const SearchPage = () => {
    const router = useRouter();
    const { searchTerm } = router.query;

    return (
        <div>
            <SessionProvider>
                <ClientComponent />
                <ServerComponent />
                <div className="flex">
                    <Sidebar />
                    <div className="flex flex-col items-center mx-auto w-[70%]">
                        <Searchbox />
                        <h1 className="text-gray-5F m-2">{` "${searchTerm}" を検索`}</h1>
                        <SearchCardList searchTerm={searchTerm as string} />
                    </div>
                </div>
            </SessionProvider>
        </div>
    );
};

export default SearchPage;
