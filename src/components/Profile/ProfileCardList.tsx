'use client';

import { Card } from '../PieChart/Card';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import useSWR from 'swr';

export const ProfileCardList = () => {
    const { data: session } = useSession();
    const userId = session?.user?.uid;
    // const fetcher = (url: string) => axios.get(url).then((res) => res.data);
    const { data: tmpUserData, mutate, error }: any = useSWR(`/api/userData/${userId}`, axios);
    console.log('idaa', userId);
    const publisherData = tmpUserData?.data;
    console.log('publisherData', publisherData);

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