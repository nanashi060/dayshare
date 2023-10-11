'use client';

import React, { useState } from 'react';
import CommentList from './CommentList';
import Detail from './Detail';

const PostDetail = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button className="px-2 bg-slate-400 text-white" onClick={() => setIsOpen(true)}>
                open
            </button>
            <Detail
                isOpen={isOpen}
                closeModal={() => setIsOpen(false)}
                openModal={() => setIsOpen(true)}
            />
        </div>
    );
};

export default PostDetail;
