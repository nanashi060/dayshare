'use client';

import { useSession } from 'next-auth/react';
import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { FaRegFaceGrinHearts } from 'react-icons/fa6';

type Prop = {
    data: {
        id: string;
        likeNum?: number;
    };
};

export const LikeButton: FC<Prop> = ({ data }) => {
    const { data: session } = useSession();
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(data.likeNum || 0);

    useEffect(() => {
        if (session) {
            axios
                .post('/api/likes/check', {
                    userId: session.user.uid,
                    cardId: data.id,
                })
                .then((response) => {
                    setLiked(response.data.status === 'liked');
                })
                .catch((error) => {
                    console.error('Error occurred:', error);
                });
        }
    }, [data, session]);

    const handleLike = () => {
        if (!session) return;
        axios
            .post('/api/likes', {
                userId: session.user.uid,
                cardId: data.id,
            })
            .then((response) => {
                if (response.data.status === 'liked') {
                    setLiked(true);
                    setLikeCount((prev: number) => prev + 1);
                } else {
                    setLiked(false);
                    setLikeCount((prev: number) => prev - 1);
                }
            });
    };

    return (
        <div className="flex  items-center pl-3 gap-x-[6px]">
            <FaRegFaceGrinHearts onClick={handleLike} color={liked ? 'pink' : '#5F5F5F'} />
            <p className="text-[#5F5F5F] text-sm font-normal">{likeCount}</p>
        </div>
    );
};
