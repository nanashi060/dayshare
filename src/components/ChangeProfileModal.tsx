'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSession } from 'next-auth/react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
// import '../../../src/src/app/globals.css';
import { FC } from 'react';

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

type Prop = { isOpen: boolean; closeModal: () => void; openModal: () => void };

export const ChangeProfileModal: FC<Prop> = ({ isOpen, closeModal, openModal }) => {
    const { data: session } = useSession();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [userName, setUserName] = useState('');
    const [description, setDescription] = useState('');
    const [editMode, setEditMode] = useState(false); // 編集モードのフラグ\

    const cancelEdit = () => {
        setUserName('');
        setDescription('');
        closeModal();
    };

    const closeAndSave = () => {};

    return (
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
                    className="w-24 h-24 rounded-full object-cover mt-5 mb-2"
                />
            </div>
            <form className="text-center">
                <label>
                    <span className="text-sm text-gray-5F mr-60">
                        Name
                        <br />
                    </span>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="font-normal text-center text-base text-black border-gray-D9 border rounded-md p-1 mb-5 w-3/4"
                    />
                </label>
                <br />

                <label>
                    <span className="text-sm text-gray-5F mr-52">
                        Description
                        <br />
                    </span>

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="text-black text-center font-normal text-base resize-none border-gray-D9 border rounded-md p-1 mb-5 w-3/4"
                    />
                </label>
            </form>
            <div className="text-center">
                <button
                    onClick={closeAndSave}
                    className="py-2 px-4 mx-3 my-4 bg-kusumi-pink hover:bg-[#a87878] text-white rounded-md"
                >
                    保存
                </button>
                <button
                    onClick={cancelEdit}
                    className="py-2 px-4 mx-3 my-4 bg-[#8091BE] hover:bg-[#6F82A9] text-white rounded-md"
                >
                    キャンセル
                </button>
            </div>
        </Modal>
    );
};
