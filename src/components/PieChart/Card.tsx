import { CustomPieChart } from './CustomPieChart';
import { Publisher } from './PublisherDetail';
import { Tag } from './Tag';
import { FC } from 'react';

type porp = { publisherData: any };

export const Card: FC<porp> = ({ publisherData }) => {
    const titleList = ['大学生', 'エンジニア'];
    return (
        <div className="w-[200px]">
            <Publisher data={publisherData} />
            <CustomPieChart />
            <Tag titleList={titleList} />
        </div>
    );
};
