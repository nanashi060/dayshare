'use client';

import Image from 'next/image';
import React, { useState, useEffect, useMemo } from 'react';
import Modal from 'react-modal';
import { useSession } from 'next-auth/react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import axios from 'axios';
import useSWR from 'swr';
import { ChangeProfileModal } from '../ChangeProfileModal';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/client';
import { Loading } from './Loading';
import { profileEnd } from 'console';

export const ProfileTop: React.FC = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [id, setId] = useState<string>('');
    const [userName, setUserName] = useState('');

    const [description, setDescription] = useState('');

    const { data: session } = useSession();
    const userId = session?.user?.uid;
    console.log('userId', userId);

    const { data, mutate }: any = useSWR(`/api/profileData/${userId}`, axios);
    const tmpData = useMemo(() => {
        return data ? data.data : {};
    }, [data]);

    console.log('tmpData', tmpData);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // ユーザーがログインしている場合
                const photoURL = user.photoURL;
                setImageUrl(photoURL || '');
                if (photoURL) {
                    console.log('ユーザーの photoURL:', photoURL);
                } else {
                    console.log('photoURL が設定されていません');
                }
            } else {
                // ユーザーがログアウトしている、またはログインしていない場合
                console.log('ユーザーがログインしていません');
            }
        });
    }, []);

    useEffect(() => {
        // profileData のデータが取得された後にステートを更新
        if (!tmpData) return;
        setId(tmpData.id);
        setUserName(tmpData.name);
        setDescription(tmpData.description);
    }, [data]); // tmpData が変更されたときに useEffect が実行される

    const handleRefreshData = async () => {
        // データを再取得するために API を呼び出す
        try {
            const response = await axios.get(`/api/profileData/${userId}`);
            mutate(`/api/profileData/${userId}`, response.data, false); // キャッシュを更新しつつ再描画を抑制
        } catch (error) {
            console.error('データの再取得エラー:', error);
        }
    };

    const item = { image: imageUrl, ...tmpData };

    if (!data) {
        return <Loading />;
    }

    return (
        <div className="mx-[30px]">
            <ChangeProfileModal
                isOpen={modalIsOpen}
                closeModal={() => {
                    setModalIsOpen(false);
                    handleRefreshData();
                }}
                openModal={() => setModalIsOpen(true)}
                item={item}
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
                src={imageUrl}
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
