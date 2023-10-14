import { ProfileCardList } from 'components/Profile/ProfileCardList';
import { ProfileTop } from 'components/Profile/ProfileTop';
import Sidebar from 'components/SidebarComponent';

const Profile = async () => {
    return (
        <main>
            <div className="flex">
                <Sidebar />
                <div className="w-full">
                    <ProfileTop />
                    <ProfileCardList />
                </div>
            </div>
        </main>
    );
};

export default Profile;
