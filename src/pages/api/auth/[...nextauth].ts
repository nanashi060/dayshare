import NextAuth from 'next-auth';
import type { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { auth } from '../../../firebase/admin';

// credentials のスキーマを定義します
const credentialsSchema = {
  idToken: { label: 'ID Token', type: 'text' },
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: credentialsSchema,
      authorize: async (credentials: Record<string, string> | undefined, _req) => {
        const idToken = credentials ? credentials.idToken : undefined;
        if (idToken) {
          try {
            const decoded = await auth.verifyIdToken(idToken);
            return {
              id: decoded.uid,
              name: decoded.name || '',
              email: decoded.email || '',
              image: '', // 画像URLが利用可能であれば追加
              ...decoded,
            };
          } catch (err) {
            console.error(err);
          }
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      // 既存のトークンとユーザー情報を組み合わせて新しいトークンを作成
      const newToken = {
        ...token,
        uid: user?.id || token.uid,
        // user オブジェクトではなく token オブジェクトから emailVerified プロパティを取得
        emailVerified: token.emailVerified,
      };
      // JWT型に合致することを確認して新しいトークンを返す
      return newToken;
    },
    async session({ session, token }) {
      session.user.emailVerified = token.emailVerified;
      session.user.uid = token.uid;
      return session;
    },
  },
};

export default NextAuth(authOptions);
