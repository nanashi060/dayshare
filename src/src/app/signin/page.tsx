'use client';
import { FaGoogle } from 'react-icons/fa';
import { useState } from 'react';
import Link from 'next/link';

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../../firebase/client';
import { signIn as signInByNextAuth } from 'next-auth/react';

const SingIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => {
        if (!email || !password) return;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const idToken = await userCredential.user.getIdToken();
            await signInByNextAuth('credentials', { idToken, callbackUrl: '/' });
        } catch (e) {
            console.error(e);
        }
    };

    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            const idToken = await userCredential.user.getIdToken();
            await signInByNextAuth('credentials', { idToken, callbackUrl: '/' });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    連携済みアカウントでログイン
                </h2>

                <button
                    type="button"
                    onClick={signInWithGoogle}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-6"
                >
                    <FaGoogle className="h-5 w-5 mr-2" /> Googleでログイン
                </button>

                <h3 className="mt-6 text-center text-xl font-bold text-gray-900">
                    メールアドレス・パスワードでログイン
                </h3>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                メールアドレス
                            </label>
                            <input
                                type="email"
                                placeholder="メールアドレス"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                パスワード
                            </label>
                            <input
                                type="password"
                                placeholder="パスワード※6文字以上"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>

                        <div>
                            <button
                                type="button"
                                onClick={signIn}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#BE8080] hover:bg-[#9E7070] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BE8080]"
                            >
                                ログイン
                            </button>
                        </div>

                        <div>
                            <Link href="/signup" passHref>
                                {' '}
                                <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8091BE] hover:bg-[#6F82A9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8091BE]">
                                    新規登録はこちら
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingIn;
