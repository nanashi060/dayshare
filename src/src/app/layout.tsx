import SessionProvider from '../../provider/SessionProvider';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <html lang="ja">
                <head />
                <body>{children}</body>
            </html>
        </SessionProvider>
    );
}
