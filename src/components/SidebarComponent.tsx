'use client';

import React, { FC, ReactElement } from 'react';
import { FaChartPie, FaHouse, FaSistrix, FaUser, FaCalendarPlus } from 'react-icons/fa6';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

interface NavigationLinkProps {
    href: string;
    icon: ReactElement;
    children: React.ReactNode;
}
export const clsx = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ');
};

const NavigationLink: FC<NavigationLinkProps> = ({ href, icon, children }) => {
    const pathname = usePathname();
    return (
        <div className=" text-lg mb-7 cursor: pointer">
            <a
                href={href}
                className={clsx(
                    'flex items-center gap-5  hover:opacity-70 hover:duration-200',
                    href == pathname ? 'text-kusumi-pink' : 'text-gray-5F'
                )}
            >
                {icon} {children}
            </a>
        </div>
    );
};

interface ActionButtonProps {
    href?: string;
    onClick?: () => void;
    children: React.ReactNode;
}

const ActionButton: FC<ActionButtonProps> = ({ href, onClick, children }) => (
    <a
        href={href}
        onClick={onClick}
        className="bg-kusumi-pink text-white pt-4 pb-4 justify-center rounded-xl w-52 flex text-md mb-6 cursor: pointer; hover:scale-105 hover:duration-300 gap-3 items-center"
    >
        {children}
    </a>
);

export default function Sidebar() {
    const { data: session } = useSession();
    const userId = session?.user?.uid;

    return (
        <div className="p-6 w-1/4 bg-white text-left h-screen min-w-max border-r border-gray-D9 sticky top-0">
            <div className="w-12">
                <a href="/">
                <img
                src={'https://firebasestorage.googleapis.com/v0/b/dayshare-b38a8.appspot.com/o/file-ag266kCk07M5sePBcgz54r3C-removebg-preview.png?alt=media&token=4bb1ef5b-688f-42f0-8eb4-00750ae2e1ff'}
                alt="DayShare-logo"
                width={80}
                height={80}
            />
                </a>
            </div>
            <div className="mt-10 ml-6 mb-16">
                <NavigationLink href="/" icon={<FaHouse size={36} />}>
                    ホーム
                </NavigationLink>
                <NavigationLink href="/search" icon={<FaSistrix size={36} />}>
                    検索
                </NavigationLink>
                {session ? (
                    <>
                        <NavigationLink href={`/profile/${userId}`} icon={<FaUser size={36} />}>
                            プロフィール
                        </NavigationLink>
                        <ActionButton href="/postmodal">
                            <FaCalendarPlus size={32} /> スケジュールを追加
                        </ActionButton>
                        <ActionButton onClick={() => signOut()}>ログアウト</ActionButton>
                    </>
                ) : (
                    <>
                        <ActionButton href="/signin">ログイン</ActionButton>
                        <ActionButton href="/signup">新規登録</ActionButton>
                    </>
                )}
            </div>
        </div>
    );
}
