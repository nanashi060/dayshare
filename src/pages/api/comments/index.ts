import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../firebase/admin';
type Comment = {
    id: string;
    postID: string;
    userID: string;
    text: string;
    parentCommentID?: string | null;
    timestamp: {
        _seconds: number;
        _nanoseconds: number;
    };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const postID = req.query.postID as string;

            if (!postID) {
                return res.status(400).json({ error: 'postID is required.' });
            }

            const commentsQuery = await db
                .collection('comments')
                .where('postID', '==', postID)
                .get();
            const comments: Comment[] = commentsQuery.docs.map(
                (doc) => ({ id: doc.id, ...doc.data() }) as Comment
            );

            const mainComments = comments.filter((comment) => !comment.parentCommentID);
            const replyComments = comments.filter((comment) => comment.parentCommentID);

            mainComments.sort((a, b) => a.timestamp._seconds - b.timestamp._seconds);

            const sortedComments = [];
            for (const mainComment of mainComments) {
                sortedComments.push(mainComment);

                const relatedReplies = replyComments.filter(
                    (reply) => reply.parentCommentID === mainComment.id
                );
                relatedReplies.sort((a, b) => a.timestamp._seconds - b.timestamp._seconds);

                sortedComments.push(...relatedReplies);
            }

            return res.status(200).json(sortedComments);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            } else {
                return res.status(500).json({ error: 'An unexpected error occurred.' });
            }
        }
    } else if (req.method === 'POST') {
        try {
            const { postID, userID, text, parentCommentID } = req.body;

            if (!postID || !userID || !text) {
                return res.status(400).json({ error: 'postID, userID, and text are required.' });
            }

            const commentData = {
                postID,
                userID,
                text,
                parentCommentID: parentCommentID || null,
                timestamp: new Date(),
            };

            const commentRef = await db.collection('comments').add(commentData);

            return res.status(201).json({ id: commentRef.id, ...commentData });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            } else {
                return res.status(500).json({ error: 'An unexpected error occurred.' });
            }
        }
    }
};
