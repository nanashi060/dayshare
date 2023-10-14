'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import useSWR from 'swr';
import { ChangeProfileModal } from '../ChangeProfileModal';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/client';
import { Loading } from './Loading';

export const ProfileTop: React.FC = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [id, setId] = useState<string>('');
    const [userName, setUserName] = useState('');
    const [description, setDescription] = useState('');
    const [createObjectURL, setCreateObjectURL] = useState('');
    const { data: session } = useSession();
    const userId = session?.user?.uid;
    const storage = getStorage();
    const { data, mutate }: any = useSWR(`/api/profileData/${userId}`, axios);
    const tmpData = data ? data.data : {};

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (userId) {
                if (user) {
                    // ユーザーがログインしている場合
                    const storageRef = ref(storage, `userImages/${userId}/profile_picture.png`);
                    getDownloadURL(storageRef).then(setCreateObjectURL);
                } else {
                    // ユーザーがログアウトしている、またはログインしていない場合
                    console.log('ユーザーがログインしていません');
                }
            }
        });
    }, [userId]);

    useEffect(() => {
        // profileData のデータが取得された後にステートを更新
        if (!tmpData) return;
        setId(tmpData.id);
        setUserName(tmpData.name);
        setDescription(tmpData.description);
    }, [data]);

    if (!data) {
        return <Loading />;
    }

    return (
        <div className="mx-[30px]">
            <ChangeProfileModal
                isOpen={modalIsOpen}
                closeModal={() => {
                    setModalIsOpen(false);
                    mutate(`/api/profileData/${userId}`);
                }}
                openModal={() => setModalIsOpen(true)}
                item={{ image: createObjectURL, ...tmpData }}
                createObjectURL={createObjectURL}
                setCreateObjectURL={setCreateObjectURL}
            />
            <button
                onClick={() => {
                    setModalIsOpen(true);
                }}
                className="text-gray-5F ml-auto relative block mr-[5vw] top-12 text-xs font-normal hover:bg-[#b9b9b9] text-center bg-gray-D9 py-1 px-2 rounded-[10px]"
            >
                プロフィールを編集
            </button>

            <Image
                src={createObjectURL}
                alt=""
                width={120}
                height={120}
                style={{ objectFit: 'cover', borderRadius: '50%' }}
                className="mx-auto"
            />

            <h3 className=" font-medium text-center text-lg text-black pt-3">{userName}</h3>
            <p className=" text-gray-5F text-center font-normal text-base leading-none">{id}</p>
            <p className="text-gray-5F text-center font-normal text-base pt-5">
                {description || '自己紹介がまだありません'}
            </p>
            <div className="flex justify-center text-black text-center font-normal pt-6 text-base gap-x-5">
                {/* <p>フォロー中 {profileData.followNum}人</p>

                <p>フォロワー {profileData.followerNum}人</p> */}
            </div>
            <div className="border-b border-gray-D9 mt-[26px] mb-4"></div>
        </div>
    );
};
