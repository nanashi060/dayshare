'use client';

import React, { useState } from 'react';
import DetailModal from 'components/PieChart/DetailModal';
import { FaXmark } from 'react-icons/fa6';
import CommentList from './CommentList';
import Detail from './Detail';

const PostDetail = async () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <FaXmark />
            <Detail />
            <CommentList />
            <DetailModal
                isOpen={isOpen}
                closeModal={() => setIsOpen(false)}
                openModal={() => setIsOpen(true)}
            />
        </div>
    );
};

export default PostDetail;
