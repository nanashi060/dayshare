import React, { FC } from 'react';
import { Comment } from './Comment';

type Prop = { data: any };

export const CommentList: FC<Prop> = ({ data }) => {
    return (
        <div className="mt-[14px] grid gap-y-5">
            {data && data.map((item: any, index: number) => <Comment key={index} item={item} />)}
        </div>
    );
};

export default CommentList;
