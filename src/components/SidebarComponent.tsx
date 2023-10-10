'use client';

import React, { FC, ReactElement } from 'react';
import { FaChartPie, FaHouse, FaSistrix, FaUser, FaCalendarPlus } from 'react-icons/fa6';
import { useSession, signOut } from 'next-auth/react';

interface NavigationLinkProps {
    href: string;
    icon: ReactElement;
    children: React.ReactNode;
}

const NavigationLink: FC<NavigationLinkProps> = ({ href, icon, children }) => (
    <div className="text-gray-5F text-lg mb-7 hover:opacity-70 hover:duration-200 cursor: pointer">
        <a href={href} className="flex items-center gap-5">
            {icon} {children}
        </a>
    </div>
);

interface ActionButtonProps {
    href?: string;
    onClick?: () => void;
    children: React.ReactNode;
}

const ActionButton: FC<ActionButtonProps> = ({ href, onClick, children }) => (
    <a
        href={href}
        onClick={onClick}
        className="bg-kusumi-pink text-white pt-4 pb-4 justify-center rounded-xl w-52 flex text-md mb-6 mx-auto cursor: pointer; hover:scale-105 hover:duration-300 gap-3 items-center"
    >
        {children}
    </a>
);

export default function Sidebar() {
    const { data: session } = useSession();

    return (
        <div className="p-6 w-1/4 bg-white text-left -ml-0 mr-auto h-screen min-w-max border-r border-gray-D9">
            <div className="w-12">
                <a href="/">
                    <FaChartPie size={48} />
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
                        <NavigationLink href="/profile" icon={<FaUser size={36} />}>
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
