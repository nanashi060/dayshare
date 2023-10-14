import { CardList } from 'components/PieChart/CardList';
import ClientComponent from '../../components/ClientComponent';
import ServerComponent from '../../components/ServerComponent';
import Sidebar from '../../components/SidebarComponent';
import { Header } from '../../components/header';
import SchedulePostComponent from '../../components/SchedulePostModal';
import { SeoHead } from '../../components/seohead';

const Home = async () => {
    const pageOgImg: string = `${process.env.NEXT_PUBLIC_DEFAULT_SITE_URL}`;
    return (
        <main>
            <SeoHead
                title={'DayShare'}
                titleTemplate={'Share your daily schedule with everyone!'}
                description={'日常のスケジュールをみんなと共有しよう！'}
                ogType={'website'}
                imgUrl={`${pageOgImg}/og.png`}
            />
            <ClientComponent />
            <ServerComponent />
            <div className="flex">
                <Sidebar />
                <div className="mx-auto w-[70%]">
                    <Header />
                    <CardList />
                </div>
            </div>
        </main>
    );
};

export default Home;
