import React, { FC } from 'react';
import { FaRegFaceGrinHearts } from 'react-icons/fa6';

type Prop = { data: any };

export const LikeButton: FC<Prop> = ({ data }) => {
    return (
        <div className="flex mt-2 items-center pl-3">
            <FaRegFaceGrinHearts color="#5F5F5F" />
            <p className="text-[#5F5F5F] text-sm font-normal">{data.likeNum}</p>
        </div>
    );
};
