import { Card } from '../PieChart/Card';
import axios from 'axios';
import useSWR from 'swr';
import { searchUserData } from '../../helpers/firestore';

export const SearchCardList = ({ searchTerm }: { searchTerm: string }) => {
    const fetcher = (url: string) => axios.get(url).then((res) => res.data);

    const { data: tmpUserData, error } = useSWR(`/api/userData?searchTerm=${searchTerm}`, fetcher);

    const publisherData: any = tmpUserData;

    if (!publisherData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid-cols-3 mx-auto w-[700px] grid gap-y-10 place-items-center">
            {publisherData &&
                publisherData.map((item: any, index: number) => (
                    <Card key={index} publisherData={item} />
                ))}
        </div>
    );
};
