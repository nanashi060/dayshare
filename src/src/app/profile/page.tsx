import { CardList } from 'components/PieChart/CardList';
import { ProfileTop } from 'components/ProfileTop';
import Sidebar from 'components/SidebarComponent';

const Profile = async () => {
    return (
        <main>
            <div className="flex">
                <Sidebar />
                <div className="w-full">
                    <ProfileTop />
                    <CardList />
                </div>
            </div>
        </main>
    );
};

export default Profile;
