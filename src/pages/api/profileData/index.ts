import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../firebase/admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const COLLECTION_NAME = 'profileData';

    if (req.method === 'POST') {
        const { username, id, userId } = req.body;
        console.log(' req.body', req.body);
        const ref = db.collection(COLLECTION_NAME);
        if (ref === undefined) {
        } else {
            try {
                await ref.doc(userId).set({
                    name: username,
                    id: id,
                });
                return res.status(200).json({ message: 'success' });
            } catch (e) {
                return console.log(e);
            }
        }
    } else if (req.method === 'PUT') {
        const { imageUrl, userName, description, userId: id } = req.body;
        const ref = await db.collection(COLLECTION_NAME).doc(id);
        if (ref === undefined) {
            return res.status(400).json({ message: 'error' });
        } else {
            try {
                ref.update({
                    name: userName,
                    description: description,
                });
                return res.status(200).json({ message: 'success' });
            } catch (e) {
                return console.log(e);
            }
        }
    }
}
