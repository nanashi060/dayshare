import { Card } from '../../PieChart/Card';
import axios from 'axios';
import useSWR from 'swr';
import { Loading } from './Loading';

export const SearchCardList = ({ searchTerm }: { searchTerm: string }) => {
    const fetcher = (url: string) => axios.get(url).then((res) => res.data);

    const { data: tmpUserData, error } = useSWR(`/api/userData?searchTerm=${searchTerm}`, fetcher);

    const publisherData: any = tmpUserData;

    if (!publisherData) {
        return <div className='w-full'><Loading /></div>;
    }

    return (
        <div className="grid-cols-3 mx-auto grid gap-y-10 justify-items-center mt-5 mb-44 w-full">
            {publisherData &&
                publisherData.map((item: any, index: number) => (
                    <Card key={index} publisherData={item} />
                ))}
        </div>
    );
};
