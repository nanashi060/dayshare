import { db } from '../../../firebase/admin';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const COLLECTION_NAME = 'userData';

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

        // const scheduleDocs = await db
        //     .collection(COLLECTION_NAME)
        //     .where('schedule.activity', '==', searchTerm)
        //     .get();

        const doc = await db
            .collection(COLLECTION_NAME)
            .where('tags', 'array-contains', searchTerm)
            .get();

        const allDocs = [
            ...categoryDocs.docs,
            ...detailsDocs.docs,
            // ...scheduleDocs.docs,
            ...doc.docs,
        ];

        const uniqueData = Array.from(new Set(allDocs.map((doc) => doc.id))).map((id) =>
            allDocs.find((doc) => doc.id === id)!.data()
        );

        res.status(200).json(uniqueData);
    } else {
        const doc = await db.collection(COLLECTION_NAME).orderBy('timestamp', 'desc').get();
        const data = doc.docs.map((doc) => doc.data());
        res.status(200).json(data);
    }
}
