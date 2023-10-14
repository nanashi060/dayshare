import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../firebase/admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const COLLECTION_NAME = 'userData';
    const { id } = req.query;
    let docId = Array.isArray(id) ? id[0] : id;

    if (!docId) {
        return res.status(400).json({ error: 'ID is required' });
    }
    try {
        const doc = await db
            .collection(COLLECTION_NAME)
            .where('userId', '==', id)
            .orderBy('timestamp', 'desc')
            .get();

        const data = doc.docs.map((doc) => doc.data());
        res.status(200).json(data);
    } catch (e) {
        console.log('Error getting document:', e);
    }
}
