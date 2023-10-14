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
    // const titleList = publisherData.map((item: any) => item.tags);
    const titleList = publisherData.tags;
    return (
        <div className="w-[200px]">
            <Publisher data={publisherData} />
            <CustomPieChart data={publisherData} />
            <Tag titleList={titleList} />
            <div className="mt-2">
                <LikeButton data={publisherData} />
            </div>
        </div>
    );
};
