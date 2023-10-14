'use client';

import { publisherDetailMock } from 'Mock/publisherDetailMock';
import { Card } from './Card';
import axios from 'axios';
import useSWR from 'swr';

export const CardList = () => {
    // const publisherData = publisherDetailMock;

    const { data: tmpUserData, error }: any = useSWR(`/api/userData`, axios);
    console.log('error', error);
    const publisherData: any = tmpUserData?.data;
    console.log('publisherData', publisherData);

    if (!publisherData) {
        return <div>Loading...</div>; // データ読み込み中の表示
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
