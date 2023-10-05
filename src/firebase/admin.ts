import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

export const firebaseAdmin =
    getApps()[0] ??
    initializeApp({
        credential: cert({
            projectId: process.env.NEXT_PUBLIC_FSA_PROJECT_ID,
            privateKey: (process.env.NEXT_PUBLIC_FSA_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
            clientEmail: process.env.NEXT_PUBLIC_FSA_CLIENT_EMAIL,
        }),
    });

export const auth = getAuth();
