'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { FC } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth } from '../firebase/client';
import { signIn as signInByNextAuth } from 'next-auth/react';

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

type Prop = {
    isOpen: boolean;
    closeModal: () => void;
    openModal: () => void;
    item: any;
    createObjectURL: any;
    setCreateObjectURL: any;
};

export const ChangeProfileModal: FC<Prop> = ({
    isOpen,
    closeModal,
    openModal,
    item,
    createObjectURL,
    setCreateObjectURL,
}) => {
    const [imageUrl, setImageUrl] = useState(item.image);
    const [userName, setUserName] = useState(item.name);
    const [description, setDescription] = useState(item?.description);

    const [errorMessage, setErrorMessage] = useState('');
    const { data: session } = useSession();
    const userId = session?.user?.uid;
    console.log('item', item);

    // const uploadToClient = (event: any) => {
    //     if (event.target.files && event.target.files[0]) {
    //         const file = event.target.files[0];
    //         setImageUrl(file);
    //         setCreateObjectURL(URL.createObjectURL(file));
    //     }
    // };

    const onImageChange = (e: any) => {
        const file = e.target.files[0];
        setImageUrl(file);
        setCreateObjectURL(URL.createObjectURL(file));
    };

    const saveImage = async () => {
        if (!imageUrl) return;
        // upload image to Firebase Storage
        const storage = getStorage();
        const imagePath = `userImages/${userId}/profile_picture.png`;
        const storageRef = ref(storage, imagePath);
        const uploadTask = uploadBytesResumable(storageRef, imageUrl);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // handle progress
                // you can use snapshot to display the upload progress to the user
            },
            (error) => {
                // handle error
                setErrorMessage(error.message);
            },
            async () => {
                // handle success
                // const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                // await updateProfile(userCredential.user, {
                //     displayName: username,
                //     photoURL: downloadURL,
                // });
                // const idToken = await userCredential.user.getIdToken();
                // await signInByNextAuth('credentials', { idToken, callbackUrl: '/' });
            }
        );
    };

    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         if (userId) {
    //             if (user) {
    //                 // ユーザーがログインしている場合

    //                 const storage = getStorage();
    //                 const storageRef = ref(storage, `userImages/${userId}/profile_picture.png`);
    //                 getDownloadURL(storageRef).then(setImageUrl);
    //             } else {
    //                 // ユーザーがログアウトしている、またはログインしていない場合
    //                 console.log('ユーザーがログインしていません');
    //             }
    //         }
    //     });
    // }, [userId]);

    const closeAndSave = async () => {
        try {
            await axios.put('/api/profileData', {
                imageUrl,
                userName,
                description,
                userId,
            });
            saveImage();
            // setUserName(item.name);
            // setDescription(item.description);
            closeModal();
        } catch {
            alert('error');
        }
    };

    const cancelEdit = () => {
        setUserName(item.name);
        setDescription(item.description);
        setCreateObjectURL(item.image);
        closeModal();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Profile Modal"
        >
            <div>
                <input
                    className="mx-auto items-center hidden opacity-0 rounded-full "
                    type="file"
                    onChange={onImageChange}
                    id="imageInput"
                />
                <label htmlFor="imageInput">
                    <Image
                        src={createObjectURL}
                        alt="Profile"
                        className="rounded-full mx-auto object-cover mb-2"
                        width={96}
                        height={96}
                    />
                </label>
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
