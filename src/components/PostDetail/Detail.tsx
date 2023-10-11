import { LikeButton } from 'components/PieChart/LikeButton';
import { PieChart } from 'components/PieChart/PieChart';
import { Publisher } from 'components/PieChart/PublisherDetail';
import { Tag } from 'components/PieChart/Tag';
import React from 'react';

const Detail = () => {
    const discription = 'コード書くの久しぶりだったな〜！';
    return (
        <div>
            <Publisher />
            <PieChart />
            <div>{discription}</div>
            <Tag titleList={['大学生']} />
            <LikeButton />
        </div>
    );
};

export default Detail;
