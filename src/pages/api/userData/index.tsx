import { db } from '../../../firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const COLLECTION_NAME = 'userData';

    const searchTerm = req.query.searchTerm as string | undefined;

    if (searchTerm) {
        const doc = await db
            .collection(COLLECTION_NAME)
            .where('tags', 'array-contains', searchTerm)
            .get();
        const data = doc.docs.map((doc) => doc.data());
        res.status(200).json(data);
    } else {
        const doc = await db.collection(COLLECTION_NAME).orderBy('timestamp', 'desc').get();
        const data = doc.docs.map((doc) => doc.data());
        res.status(200).json(data);
    }
}
