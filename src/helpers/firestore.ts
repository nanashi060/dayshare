import { firestore } from 'firebase-admin';

export const searchUserData = async (searchTerm: string) => {
    const db = firestore();
    const userDataRef = db.collection('userData');
    const snapshot = await userDataRef.where('tags', 'array-contains', searchTerm).get();

    const data: any[] = [];
    snapshot.forEach((doc) => {
        data.push(doc.data());
    });

    return data;
};
