'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSession } from 'next-auth/react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
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
    // const [userName, setUserName] = useState('');
    // const [userId, setUserId] = useState('');
    // const [description, setDescription] = useState('');

    useEffect(() => {
        if (session) {
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
        }
    }, [session]);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const data = {
        image: '',
        name: '山田花子',
        id: '@yamahana',
        discription:
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
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Profile Modal"
            >
                <div className="flex items-center justify-center">
                    <img
                        src={imageUrl}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover mr-4"
                    />
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
                {data.discription}
            </p>
            <div className="flex justify-center text-black text-center font-normal pt-6 text-base gap-x-5">
                <p>フォロー中 {data.followNum}人</p>

                <p>フォロワー {data.followerNum}人</p>
            </div>
            <div className="border-b border-gray-D9 mt-[26px] mb-4"></div>
        </div>
    );
};
