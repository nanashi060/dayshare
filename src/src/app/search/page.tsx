'use client';

import Sidebar from '../../../components/SidebarComponent';
import { useState } from 'react';

const search = async () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        // ここで検索を実行するか、必要に応じて他の処理を追加
        console.log(`Searching for: ${searchTerm}`);
    };

    return (
        <div className="flex">
            <Sidebar />
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
        </div>
    );
};

export default search;
