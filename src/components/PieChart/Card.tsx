import { CustomPieChart } from './CustomPieChart';
import { LikeButton } from './LikeButton';
import { Publisher } from './PublisherDetail';
import { Tag } from './Tag';
import { FC } from 'react';

type porp = { publisherData: any };

export const Card: FC<porp> = ({ publisherData }) => {
    if (!publisherData) {
        return <div>Loading...</div>;
    }
    const uniqueId = publisherData.id;
    const likeNum = publisherData.likeNum

    return (
        <div className="w-[200px]">
            <Publisher data={publisherData} />
            <CustomPieChart data={publisherData} />
            <Tag titleList={publisherData.tags} />
            <div className="mt-2">
                <LikeButton data={{ id: uniqueId, likeNum: likeNum }} />
            </div>
        </div>
    );
};
