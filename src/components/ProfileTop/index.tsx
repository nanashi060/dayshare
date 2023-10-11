'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSession } from 'next-auth/react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import '../../../src/src/app/globals.css';

const customStyles: ReactModal.Styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(217, 217, 217, 0.70)',
    },

    content: {
        margin: 'auto auto',
        width: '35%',
        minWidth: '420px',
        height: '85%',
        borderRadius: '7%',
        border: '0px',
        padding: '30px 30px 15px 30px',
        backgroundColor: 'rgba(255,255,255,1)',
    },
};

export const ProfileTop: React.FC = () => {
    const { data: session } = useSession();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [userName, setUserName] = useState('');
    const [description, setDescription] = useState('');
    const [editMode, setEditMode] = useState(false); // 編集モードのフラグ

    useEffect(() => {
        if (session) {
            // Firestoreからユーザー情報を取得
            const db = getFirestore();
            const userDocRef = doc(db, 'users', session.user.uid);

            getDoc(userDocRef)
                .then((docSnapshot) => {
                    if (docSnapshot.exists()) {
                        const userData = docSnapshot.data();
                        // Firestoreから取得したデータをステート変数にセット
                        setUserName(userData.userName || '');
                        setDescription(userData.description || '');

                        const storage = getStorage();
                        const imagePath = `userImages/${session.user.uid}/profile_picture.png`;
                        const storageRef = ref(storage, imagePath);
                        getDownloadURL(storageRef)
                            .then((url) => {
                                setImageUrl(url);
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    } else {
                        console.error('ユーザーのドキュメントが存在しません。');
                    }
                })
                .catch((error) => {
                    console.error('Firestoreデータ取得エラー:', error);
                });
        }
    }, [session]);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeAndSaveModal = () => {
        setModalIsOpen(false);
        // ここでフォームの値を保存するロジックを実行
    };

    const cancelEdit = () => {
        setEditMode(false); // 編集モードを無効にする
    };

    // プロフィール情報を取得する関数（仮定）
    const fetchUserProfileData = () => {
        // ユーザープロフィール情報をデータベースから取得
        // 取得した情報をもとに初期値を設定
        const userProfileData = getUserProfileData(); // 仮定の関数
        setUserName(userProfileData.userName);
        setDescription(userProfileData.description);
    };

    useEffect(() => {
        if (session) {
            // セッションがある場合にプロフィール情報を取得
            fetchUserProfileData();
        }
    }, [session]);

    const data = {
        image: '',
        name: '山田花子',
        id: '@yamahana',
        description:
            '高校生でエンジニアの山田花子です。やまはなってよんでね!aaaaaaaaaaaaaaaaaaaaaaaaaa',
        followNum: 98,
        followerNum: 202,
    };

    return (
        <div className="mx-[30px]">
            <button
                onClick={openModal}
                className="text-gray-5F ml-auto relative block mr-[5vw] top-12 text-xs font-normal hover:bg-[#b9b9b9] text-center bg-gray-D9 py-1 px-2 rounded-[10px]"
            >
                プロフィールを編集
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeAndSaveModal}
                style={customStyles}
                contentLabel="Profile Modal"
            >
                <div className="flex items-center justify-center">
                    <img
                        src={imageUrl}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover mt-5 mb-2"
                    />
                </div>
                <form className="text-center">
                    <label>
                    <span className='text-sm text-gray-5F mr-56'>Name<br /></span>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="font-normal text-center text-base text-black border-gray-D9 border rounded-md p-1 mb-5 w-3/4"
                        />
                    </label>
                    <br />

                    <label>
                        <span className='text-sm text-gray-5F mr-48'>Description<br /></span>

                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="text-black text-center font-normal text-base resize-none border-gray-D9 border rounded-md p-1 mb-5 w-3/4"
                        />
                    </label>
                </form>
                <div className='text-center'>
                    <button onClick={closeAndSaveModal} className="py-2 px-4 mx-3 my-4 bg-kusumi-pink hover:bg-[#a87878] text-white rounded-md">
                        保存
                    </button>
                    <button onClick={cancelEdit} className="py-2 px-4 mx-3 my-4 bg-[#8091BE] hover:bg-[#6F82A9] text-white rounded-md">キャンセル</button>
                </div>
            </Modal>
            <Image
                src={data.image}
                alt=""
                width={120}
                height={120}
                style={{ objectFit: 'cover', borderRadius: '50%' }}
                className="mx-auto"
            />
            <h3 className=" font-medium text-center text-lg text-black pt-3">{data.name}</h3>
            <p className=" text-gray-5F text-center font-normal text-base leading-none">
                {data.id}
            </p>
            <p className="text-gray-5F text-center font-normal text-base pt-5">
                {data.description}
            </p>
            <div className="flex justify-center text-black text-center font-normal pt-6 text-base gap-x-5">
                <p>フォロー中 {data.followNum}人</p>

                <p>フォロワー {data.followerNum}人</p>
            </div>
            <div className="border-b border-gray-D9 mt-[26px] mb-4"></div>
        </div>
    );
};
