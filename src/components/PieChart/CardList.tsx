import { publisherDetailMock } from 'Mock/publisherDetailMock';
import { Card } from './Card';

export const CardList = () => {
    const publisherData = publisherDetailMock;
    return (
        <div className="grid-cols-3 w-[700px] grid place-items-center">
            {publisherData.map((item, index) => (
                <Card key={index} publisherData={item} />
            ))}
        </div>
    );
};
