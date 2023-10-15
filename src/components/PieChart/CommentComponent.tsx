'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

type CommentType = {
    id: string;
    text: string;
    userID: string;
    parentCommentID?: string;
};

type Props = {
    postID: string;
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
        <div>
            {Array.isArray(comments) &&
                comments.map((comment) => (
                    <div
                        key={comment.id}
                        style={{ marginLeft: comment.parentCommentID ? '20px' : '0' }}
                    >
                        <p>{comment.text}</p>
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
