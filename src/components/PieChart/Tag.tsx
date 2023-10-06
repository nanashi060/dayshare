'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';

type prop = { titleList: string[] };

export const Tag: FC<prop> = ({ titleList }) => {
    const router = useRouter();
    return (
        <>
            <div className="flex gap-x-1">
                {titleList.map((title: string) => (
                    <button
                        key={title}
                        className="py-1 font-normal text-xs hover:bg-slate-800 rounded-[12px] text-[#5F5F5F] px-[6px] bg-[#D9D9D9]"
                        onClick={() => router.push(`/api/post/${title}`)}
                    >
                        {title}
                    </button>
                ))}
            </div>
        </>
    );
};
