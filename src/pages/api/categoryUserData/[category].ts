import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../firebase/admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const COLLECTION_NAME = 'userData';
    const LIKES_COLLECTION = 'likes';
    const { category } = req.query;

    try {
        const doc = await db
            .collection(COLLECTION_NAME)
            .where('category', '==', category)
            .orderBy('timestamp', 'desc')
            .get();

        const uniqueData = Array.from(new Set(doc.docs.map((doc) => doc.id))).map((id) => {
            const docData = doc.docs.find((doc) => doc.id === id);
            return { id: docData!.id, ...docData!.data(), likeNum: 0 };
        }) as any[];

        for (const data of uniqueData) {
            const likeCount = await db
                .collection(LIKES_COLLECTION)
                .where('cardId', '==', data.id)
                .get();

            data.likeNum = likeCount.size || 0;
        }

        res.status(200).json(uniqueData);
        // const data = doc.docs.map((doc) => doc.data());
        // res.status(200).json(data);
    } catch (e) {
        console.log('Error getting document:', e);
    }
}
