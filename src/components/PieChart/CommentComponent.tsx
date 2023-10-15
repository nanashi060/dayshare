'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import useSWR from 'swr';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

type FirestoreTimestamp = {
    _seconds: number;
    _nanoseconds: number;
};

type CommentType = {
    id: string;
    text: string;
    userID: string;
    parentCommentID?: string;
    timestamp: FirestoreTimestamp;
};

type Props = {
    postID: string;
};

const Comment: React.FC<{ comment: CommentType }> = ({ comment }) => {
    const { data: profileData }: any = useSWR(`/api/profileData/${comment.userID}`, (url: string) =>
        axios.get(url).then((res) => res.data)
    );

    const [imageUrl, setImageUrl] = useState('/default.png');

    useEffect(() => {
        const storage = getStorage();
        const imagePath = `userImages/${comment.userID}/profile_picture.png`;

        const storageRef = ref(storage, imagePath);
        getDownloadURL(storageRef)
            .then(setImageUrl)
            .catch((error) => {
                if (error.code === 'storage/object-not-found') {
                    setImageUrl('/default.png');
                }
            });
    }, [comment.userID]);
    const firestoreTimestampToDate = (timestamp: { _seconds: any; _nanoseconds?: number }) => {
        return new Date(timestamp._seconds * 1000);
    };

    const formatTimestamp = (timestamp: { _seconds: number; _nanoseconds: number }) => {
        const date = firestoreTimestampToDate(timestamp);
        return date.toLocaleString();
    };

    console.log(comment.timestamp);

    return (
        <div className="flex gap-x-2">
            <Image
                src={imageUrl}
                alt="User Profile"
                width={42}
                height={42}
                className="rounded-full object-cover"
            />
            <div>
                <div className="flex gap-x-[10px]">
                    <p className="text-black text-xs font-normal">{profileData?.name}</p>
                    <p className="text-gray-5F text-xs font-normal">{profileData?.id}</p>
                    <p className="text-gray-5F text-xs font-normal">
                        {formatTimestamp(comment.timestamp)}
                    </p>
                </div>
                <p className="pl-[6px] pt-2 text-black text-sm font-normal">{comment.text}</p>
            </div>
        </div>
    );
};

export const CommentComponent: React.FC<Props> = ({ postID }) => {
    const { data: session } = useSession();
    const [comments, setComments] = useState<CommentType[]>([]);
    const [text, setText] = useState<string>('');
    const [replyTo, setReplyTo] = useState<string | undefined>();

    useEffect(() => {
        axios
            .get(`/api/comments?postID=${postID}`)
            .then((response) => {
                setComments(response.data);
            })
            .catch((error) => {
                console.error('Error fetching comments:', error);
            });
    }, [postID]);

    const postComment = async (parentCommentID?: string) => {
        if (!text || !session?.user?.uid) return;
        try {
            const response = await axios.post('/api/comments', {
                postID,
                userID: session.user.uid,
                text,
                parentCommentID,
            });

            setComments((prev) =>
                Array.isArray(prev) ? [...prev, response.data] : [response.data]
            );
            setText('');
            setReplyTo(undefined);
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    return (
        <div className="mt-[14px] grid gap-y-5">
            {Array.isArray(comments) &&
                comments.map((comment) => (
                    <div
                        key={comment.id}
                        style={{ marginLeft: comment.parentCommentID ? '20px' : '0' }}
                    >
                        <Comment comment={comment} />
                        <button onClick={() => setReplyTo(comment.id)}>
                            Reply to this comment
                        </button>
                    </div>
                ))}

            <div>
                {replyTo && <p>Replying to comment ID: {replyTo}</p>}
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add a comment or reply..."
                />
                <button onClick={() => postComment(replyTo)}>Post</button>
                {replyTo && <button onClick={() => setReplyTo(undefined)}>Cancel Reply</button>}
            </div>
        </div>
    );
};
