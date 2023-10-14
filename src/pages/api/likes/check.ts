import { db } from '../../../firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const COLLECTION_NAME = 'likes';

    switch (req.method) {
        case 'POST':
            const { userId, cardId } = req.body;

            // Validate userId and cardId
            if (!userId || !cardId) {
                res.status(400).json({ error: 'userId or cardId is missing or undefined' });
                return;
            }

            // Check for an existing like for the given userId and cardId
            const likeDoc = await db
                .collection(COLLECTION_NAME)
                .where('userId', '==', userId)
                .where('cardId', '==', cardId)
                .get();

            // If the document is found, then the user has liked it.
            if (!likeDoc.empty) {
                res.status(200).json({ status: 'liked' });
            } else {
                res.status(200).json({ status: 'unliked' });
            }
            break;
        default:
            res.status(405).end(); // Method not allowed
            break;
    }
}
