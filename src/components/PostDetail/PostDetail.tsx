'use client';

import React, { FC, useState } from 'react';
import PostDetailModal from './PostDetailModal';

type Prop = { item: any };

const PostDetail: FC<Prop> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button className="px-2 bg-slate-400 text-white" onClick={() => setIsOpen(true)}>
                open
            </button>
            <PostDetailModal
                isOpen={isOpen}
                closeModal={() => setIsOpen(false)}
                openModal={() => setIsOpen(true)}
                item={item}
            />
        </div>
    );
};

export default PostDetail;
