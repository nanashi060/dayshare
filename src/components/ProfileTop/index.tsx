'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSession } from 'next-auth/react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import axios from 'axios';
import useSWR from 'swr';
import { ChangeProfileModal } from '../ChangeProfileModal';
import { useRouter } from 'next/router';

export const ProfileTop: React.FC = () => {
    const { data: session } = useSession();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [userName, setUserName] = useState('');
    const [description, setDescription] = useState('');
    // const [id, setId] = useState('');

    const userId = session?.user?.uid;

    const { data }: any = useSWR(`/api/profileData/${userId}`, axios);
    const profileData = data?.data;
    // const router = useRouter();
    console.log('profileData', profileData);

    // useEffect(() => {
    //     const tmpPath = router.asPath.split('/')[2];
    //     if (tmpPath === '[id]') return;
    //     console.log(tmpPath);
    //     setId(tmpPath);
    // }, []);

    if (!data) {
        return <div>loading...</div>;
    }

    return (
        <div className="mx-[30px]">
            <button
                onClick={() => setModalIsOpen(true)}
                className="text-gray-5F ml-auto relative block mr-[5vw] top-12 text-xs font-normal hover:bg-[#b9b9b9] text-center bg-gray-D9 py-1 px-2 rounded-[10px]"
            >
                プロフィールを編集
            </button>
            <ChangeProfileModal
                isOpen={modalIsOpen}
                closeModal={() => setModalIsOpen(false)}
                openModal={() => setModalIsOpen(true)}
            />
            <Image
                src={''}
                alt=""
                width={120}
                height={120}
                style={{ objectFit: 'cover', borderRadius: '50%' }}
                className="mx-auto"
            />
            <h3 className=" font-medium text-center text-lg text-black pt-3">{profileData.name}</h3>
            <p className=" text-gray-5F text-center font-normal text-base leading-none">
                {profileData.id}
            </p>
            <p className="text-gray-5F text-center font-normal text-base pt-5">
                {profileData.description}
            </p>
            <div className="flex justify-center text-black text-center font-normal pt-6 text-base gap-x-5">
                {/* <p>フォロー中 {profileData.followNum}人</p>

                <p>フォロワー {profileData.followerNum}人</p> */}
            </div>
            <div className="border-b border-gray-D9 mt-[26px] mb-4"></div>
        </div>
    );
};
