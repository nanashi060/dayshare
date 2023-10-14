'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const Searchbox = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        router.push(`/search/${searchTerm}`);
        console.log(`Searching for: ${searchTerm}`);
    };
    return (
        <div className="w-3/4 text-center mt-16">
            <input
                type="text"
                placeholder="検索ワードを入力"
                value={searchTerm}
                onChange={handleInputChange}
                className="border rounded-md border-kusumi-pink py-1.5 px-5 mr-5 w-1/2"
                style={{
                    backgroundImage: "url('/magnifying-glass-solid.svg')",
                    backgroundPosition: 'left 10px center',
                    backgroundSize: '18px',
                    backgroundRepeat: 'no-repeat',
                    paddingLeft: '38px',
                    paddingRight: '16px',
                }}
            />
            <button onClick={handleSearch}>検索</button>
        </div>
    );
};
