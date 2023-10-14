'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const Test = () => {
    const { data: session } = useSession();

    return (
        <div className="flex justify-center mt-6">
            {session ? (
                <>
                    <button
                        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                        onClick={() => console.log('New Post Clicked')}
                    >
                        New Post
                    </button>
                    <button
                        className="px-4 py-2 ml-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                        onClick={() => signOut()}
                    >
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <div className="flex">
                        <Link href="/signin">
                            <button className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                                Login
                            </button>
                        </Link>
                        <Link href="/signup">
                            <button className="px-4 py-2 mr-2 font-bold text-black bg-green-500 rounded hover:bg-green-700">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default Test;
