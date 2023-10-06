import { publisherDetailMock } from 'Mock/publisherDetailMock';
import { Card } from './Card';

export const CardList = () => {
    const publisherData = publisherDetailMock;
    return (
        <div className="flex gap-[50px]">
            {publisherData.map((item, index) => (
                <Card key={index} publisherData={item} />
            ))}
        </div>
    );
};
