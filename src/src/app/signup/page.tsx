'use client';

import { useState } from 'react';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth } from '../../../firebase/client';
import { signIn as signInByNextAuth } from 'next-auth/react';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [image, setImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const onImageChange = (e: any) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const signUp = async () => {
        if (!email || !password || !username || !image) return;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;

            // upload image to Firebase Storage
            const storage = getStorage();
            const imagePath = `userImages/${userId}/profile_picture.png`;
            const storageRef = ref(storage, imagePath);
            const uploadTask = uploadBytesResumable(storageRef, image);

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
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    await updateProfile(userCredential.user, {
                        displayName: username,
                        photoURL: downloadURL,
                    });
                    const idToken = await userCredential.user.getIdToken();
                    await signInByNextAuth('credentials', { idToken, callbackUrl: '/' });
                }
            );
        } catch (e: any) {
            console.error(e);
            setErrorMessage(e.message);
        }
    };

    const signUpWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            const idToken = await userCredential.user.getIdToken();
            await signInByNextAuth('credentials', { idToken, callbackUrl: '/' });
        } catch (e: any) {
            console.error(e);
            setErrorMessage(e.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-56 bg-gray-100 sm:mt-0">
            <div className="w-full px-8 py-6 mx-auto mt-8 bg-white rounded shadow-md sm:w-3/4 lg:w-1/2">
                <h2 className="mb-4 text-xl font-semibold text-gray-700">新規登録</h2>
                <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="ユーザー名"
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="メールアドレス"
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="パスワード"
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
                <input
                    type="file"
                    onChange={onImageChange}
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
                <button
                    type="button"
                    onClick={signUp}
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                >
                    新規登録
                </button>
                <button
                    type="button"
                    onClick={signUpWithGoogle}
                    className="w-full px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                >
                    Googleで新規登録
                </button>
                {errorMessage && (
                    <p className="mt-3 text-xs italic text-red-500 border border-red-500 p-2 rounded">
                        {errorMessage}
                    </p>
                )}
            </div>
        </div>
    );
};

export default SignUp;
