'use client';

import { Card } from '../Card';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { FC } from 'react';
import useSWR from 'swr';
import { Loading } from './Loading';

type Prop = { category: string };

export const CustomCardList: FC<Prop> = ({ category }) => {
    const { data: session } = useSession();
    const userId = session?.user?.uid;
    const { data: tmpUserData }: any = useSWR(`/api/categoryUserData/${category}`, axios);
    const publisherData = tmpUserData?.data;

    if (!publisherData) {
        return <Loading />;
    }

    return (
        <div className="grid-cols-3 mx-auto grid gap-y-10 justify-items-center mt-5 mb-44">
            {publisherData &&
                publisherData.map((item: any, index: number) => (
                    <Card key={index} publisherData={item} />
                ))}
        </div>
    );
};
