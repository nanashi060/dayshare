'use client';

import axios from 'axios';
import useSWR from 'swr';

import { useState } from 'react';
import { Loading } from './CardList/Loading';
import { Card } from './Card';
import { CustomCardList } from './CardList/CustomCardList';
import { CardList } from './CardList';

export const Contents = () => {
    const { data: tmpUserData, error }: any = useSWR(`/api/userData`, axios);
    console.log('error', error);
    const publisherData: any = tmpUserData?.data;
    console.log('publisherData', publisherData);
    const [selectedMenu, setSelectedMenu] = useState('recommendation');

    const menu = [
        {
            title: 'おすすめ',
            slug: 'recommendation',
            action: () => setSelectedMenu('recommendation'),
        },
        {
            title: '大学生',
            slug: 'universityStudent',
            action: () => setSelectedMenu('universityStudent'),
        },
        { title: '社会人', slug: 'workingAdult', action: () => setSelectedMenu('workingAdult') },
    ];

    if (!publisherData) {
        return <Loading />;
    }
    console.log('publisherData', publisherData);
    return (
        <>
            <div className="mb-44">
                {selectedMenu == 'recommendation' && <CardList />}
                {selectedMenu == 'universityStudent' && <CustomCardList category="大学生" />}
                {selectedMenu == 'workingAdult' && <CustomCardList category="社会人" />}

                <div className="w-full border-[#D9D9D9] border-t fixed h-[18%] bottom-0 bg-[rgba(255,255,255,0.93)]"></div>
                <div className="flex justify-center w-[600px] mx-auto">
                    <div className="flex fixed w-[45vw] bottom-[4.5%] justify-between">
                        {menu.map((item, index) => {
                            if (item.slug == selectedMenu) {
                                return (
                                    <button
                                        key={index}
                                        className="px-6 py-3 text-white text-lg font-normal bg-kusumi-pink rounded-2xl shadow-lg hover:opacity-90"
                                        onClick={item.action}
                                    >
                                        {item.title}
                                    </button>
                                );
                            } else {
                                return (
                                    <button
                                        key={index}
                                        className="px-6 py-3 text-black text-lg font-normal bg-gray-D9 rounded-2xl shadow-lg hover:opacity-[85%]"
                                        onClick={item.action}
                                    >
                                        {item.title}
                                    </button>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};
