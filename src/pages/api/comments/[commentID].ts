import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../firebase/admin';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PUT') {
        try {
            const { commentID } = req.query;
            const { text } = req.body;

            if (!text) {
                return res.status(400).json({ error: 'Text is required.' });
            }

            await db
                .collection('comments')
                .doc(commentID as string)
                .update({ text });

            return res.status(200).json({ message: 'Updated successfully.' });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            } else {
                return res.status(500).json({ error: 'An unexpected error occurred.' });
            }
        }
    } else if (req.method === 'DELETE') {
        try {
            const { commentID } = req.query;

            await db
                .collection('comments')
                .doc(commentID as string)
                .delete();

            return res.status(200).json({ message: 'Deleted successfully.' });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            } else {
                return res.status(500).json({ error: 'An unexpected error occurred.' });
            }
        }
    }
};
