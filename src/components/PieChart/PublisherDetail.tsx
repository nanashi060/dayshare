'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { formatDate } from 'utils/formatDate';
import { onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { auth } from '../../firebase/client';

type Prop = { data: any };

export const Publisher: React.FC<Prop> = ({ data }) => {
    const date = new Date(data.timestamp._seconds * 1000);
    const formatTime = formatDate(date);

    const [imageUrl, setImageUrl] = useState(data.icon_image || '/default.png');

    const userId = data.userId;

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
                            // ファイルが存在しない場合、デフォルトの画像をセットする
                            setImageUrl('/default.png');
                        }
                    });
            } else {
                console.log('ユーザーがログインしていません');
            }
        });
    }, [userId]);

    return (
        <div className="flex gap-x-3">
            <Image
                src={imageUrl}
                alt=""
                width={42}
                height={42}
                className="rounded-full object-cover"
            />

            <div>
                <div className="flex gap-x-3">
                    <p className="text-xs font-normal">{data.name}</p>
                    <p className="text-xs font-normal text-[#5F5F5F]">{data.id}</p>
                </div>
                <p className="text-xs font-normal text-[#5F5F5F]">{formatTime}</p>
            </div>
        </div>
    );
};
