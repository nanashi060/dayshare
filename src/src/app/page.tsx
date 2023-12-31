import ClientComponent from '../../components/ClientComponent';
import ServerComponent from '../../components/ServerComponent';
import Sidebar from '../../components/SidebarComponent';
import { Header } from '../../components/header';
import { SeoHead } from '../../components/seohead';
import { Contents } from 'components/PieChart/Contents';

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
                <div className="mx-auto w-full">
                    <Header />
                    <Contents />
                </div>
            </div>
        </main>
    );
};

export default Home;
