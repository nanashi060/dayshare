import { CardList } from 'components/PieChart/CardList';
import ClientComponent from '../../components/ClientComponent';
import ServerComponent from '../../components/ServerComponent';
import TestComponent from '../../components/test';
import './globals.css';

const Home = async () => {
    return (
        <main>
            <ClientComponent />
            <ServerComponent />
            <TestComponent />
            <CardList />
        </main>
    );
};

export default Home;
