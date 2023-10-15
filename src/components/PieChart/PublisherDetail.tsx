'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { formatDate } from 'utils/formatDate';
import { onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { auth } from '../../firebase/client';
import axios from 'axios';
import useSWR from 'swr';
import Link from 'next/link';

type Prop = {
    data: {
        userId: string;
        timestamp: {
            _seconds: number;
        };
        icon_image?: string;
    };
};

export const Publisher: React.FC<Prop> = ({ data }) => {
    const { userId, timestamp, icon_image } = data;
    const date = new Date(timestamp._seconds * 1000);
    const formatTime = formatDate(date);
    const [imageUrl, setImageUrl] = useState(icon_image || '/default.png');
    const fetcher = (url: string) => axios.get(url).then((res) => res.data);
    const { data: tmpProfileData }: any = useSWR(`/api/profileData/${userId}`, fetcher);
    const profileData = tmpProfileData?.data;
    console.log(profileData);

    const name = profileData?.name;
    const id = profileData?.id;

    useEffect(() => {
        if (!userId) return;

        const storage = getStorage();
        const imagePath = `userImages/${userId}/profile_picture.png`;

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const storageRef = ref(storage, imagePath);
                getDownloadURL(storageRef)
                    .then(setImageUrl)
                    .catch((error) => {
                        if (error.code === 'storage/object-not-found') {
                            setImageUrl('/default.png');
                        }
                    });
            } else {
                console.log('ユーザーがログインしていません');
            }
        });
    }, [userId]);

    return (
        <Link href={`/profile/${profileData?.userId}`} className="flex gap-x-3">
            <Image
                src={imageUrl}
                alt=""
                width={42}
                height={42}
                className="rounded-full object-cover"
            />
            <div className="flex gap-x-3 flex-col">
                <div className="flex gap-x-3">
                    <p className="text-xs font-normal">{name}</p>
                    <p className="text-xs font-normal text-[#5F5F5F]">{id}</p>
                </div>
                <p className="text-xs font-normal text-[#5F5F5F]">{formatTime}</p>
            </div>
        </Link>
    );
};
