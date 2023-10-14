import { db } from '../../../firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const COLLECTION_NAME = 'userData';
    const LIKES_COLLECTION = 'likes';

    const searchTerm = req.query.searchTerm as string | undefined;

    if (searchTerm) {
        const categoryDocs = await db
            .collection(COLLECTION_NAME)
            .where('category', '==', searchTerm)
            .get();

        const detailsDocs = await db
            .collection(COLLECTION_NAME)
            .where('details', '==', searchTerm)
            .get();

        const doc = await db
            .collection(COLLECTION_NAME)
            .where('tags', 'array-contains', searchTerm)
            .get();

        const allDocs = [...categoryDocs.docs, ...detailsDocs.docs, ...doc.docs];

        const uniqueData = Array.from(new Set(allDocs.map((doc) => doc.id))).map((id) => {
            const docData = allDocs.find((doc) => doc.id === id);
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
    } else {
        const doc = await db.collection(COLLECTION_NAME).orderBy('timestamp', 'desc').get();
        const data = doc.docs.map((doc) => ({ id: doc.id, ...doc.data(), likeNum: 0 })) as any[];

        for (const item of data) {
            const likeCount = await db
                .collection(LIKES_COLLECTION)
                .where('cardId', '==', item.id)
                .get();

            item.likeNum = likeCount.size || 0;
        }

        res.status(200).json(data);
    }
}
