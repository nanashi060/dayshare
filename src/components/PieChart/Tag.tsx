'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';

type prop = { titleList: string[] };

export const Tag: FC<prop> = ({ titleList }) => {
    const router = useRouter();
    return (
        <>
            <div className="flex gap-x-1 w-[200px] flex-wrap gap-y-1">
                {titleList.map((title: string, index: number) => (
                    <button
                        key={`${title}-${index}`}
                        className="py-0.5 font-normal text-xs hover:bg-[#B3B3B3] rounded-xl text-gray-5F px-1.5 bg-gray-D9"
                        onClick={() => router.push(`/search/${title}`)}
                    >
                        {title}
                    </button>
                ))}
            </div>
        </>
    );
};
