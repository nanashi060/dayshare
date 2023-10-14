import { db } from '../../../firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const COLLECTION_NAME = 'likes';

    switch (req.method) {
        case 'POST':
            const { userId, cardId } = req.body;

            if (!userId || !cardId) {
                res.status(400).json({ error: 'userId or cardId is missing or undefined' });
                return;
            }

            const likeDoc = await db
                .collection(COLLECTION_NAME)
                .where('userId', '==', userId)
                .where('cardId', '==', cardId)
                .get();
            if (!likeDoc.empty) {
                await db.collection(COLLECTION_NAME).doc(likeDoc.docs[0].id).delete();
                res.status(200).json({ status: 'unliked' });
            } else {
                await db.collection(COLLECTION_NAME).add({
                    userId,
                    cardId,
                });
                res.status(200).json({ status: 'liked' });
            }
            break;
        default:
            res.status(405).end();
            break;
    }
}
