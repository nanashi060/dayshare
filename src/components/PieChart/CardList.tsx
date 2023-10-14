'use client';

import { Card } from './Card';
import axios from 'axios';
import useSWR from 'swr';

export const CardList = () => {
    const { data: tmpUserData, error }: any = useSWR(`/api/userData`, axios);
    console.log('error', error);
    const publisherData: any = tmpUserData?.data;
    console.log('publisherData', publisherData);
    

    if (!publisherData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid-cols-3 mx-auto grid gap-y-10 place-items-center my-5">
            {publisherData &&
                publisherData.map((item: any) => <Card key={item.id} publisherData={item} />)}
                
        </div>
    );
};
