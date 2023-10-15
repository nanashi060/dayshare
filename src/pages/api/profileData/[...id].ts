import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../firebase/admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const COLLECTION_NAME = 'profileData';
    const { id } = req.query;
    let docId = Array.isArray(id) ? id[0] : id;

    if (!docId) {
        return res.status(400).json({ error: 'ID is required' });
    }
    const doc = await db.collection(COLLECTION_NAME).doc(docId!).get();

    const data = doc.data();
    res.status(200).json({ userId: id, ...data });
}
