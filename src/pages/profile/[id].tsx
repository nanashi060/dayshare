import { ProfileCardList } from 'components/Profile/ProfileCardList';
import { ProfileTop } from 'components/Profile/ProfileTop';
import Sidebar from 'components/SidebarComponent';
import { useRouter } from 'next/router';
import SessionProvider from '../../provider/SessionProvider';
import '../../src/app/globals.css';
import { Header } from '../../components/header';

const Profile = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <SessionProvider>
            <main>
                <div className="flex">
                    <Sidebar />
                    <Header />
                    <div className="w-full">
                        {id ? <ProfileTop userId={id as string} /> : <div>loading...</div>}
                        <ProfileCardList userId={id as string} />
                    </div>
                </div>
            </main>
        </SessionProvider>
    );
};

export default Profile;
