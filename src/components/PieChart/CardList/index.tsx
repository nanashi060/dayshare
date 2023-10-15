'use client';

import { Card } from '../Card';
import axios from 'axios';
import useSWR from 'swr';
import { Loading } from './Loading';

export const CardList = () => {
    const { data: tmpUserData, error }: any = useSWR(`/api/userData`, axios);
    console.log('error', error);
    const publisherData: any = tmpUserData?.data;
    console.log('publisherData', publisherData);

    if (!publisherData) {
        return <Loading />;
    }

    return (
        <>
            <div className="grid-cols-3 mx-auto grid gap-y-10 justify-items-center mt-5 mb-44">
                {publisherData &&
                    publisherData.map((item: any) => (
                        <div key={item.id}>
                            <Card publisherData={item} />
                        </div>
                    ))}
            </div>
        </>
    );
};
