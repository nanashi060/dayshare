import { CustomPieChart } from './CustomPieChart';
import { LikeButton } from './LikeButton';
import { Publisher } from './PublisherDetail';
import { Tag } from './Tag';
import { FC, useState } from 'react';
import PostDetailModal from 'components/PostDetail/PostDetailModal';
import { Loading } from './CardList/Loading';

type porp = { publisherData: any };

export const Card: FC<porp> = ({ publisherData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    if (!publisherData) {
        return (
            <div>
                <Loading />
            </div>
        );
    }
    const uniqueId = publisherData.id;
    const likeNum = publisherData.likeNum;

    const newItem = { likeNum: likeNum, ...publisherData };

    const openModal = (item: any) => {
        setIsOpen(true);
        setSelectedItem(item);
    };

    return (
        <>
            <div>
                {selectedItem && (
                    <PostDetailModal
                        isOpen={isOpen}
                        closeModal={() => setIsOpen(false)}
                        openModal={() => setIsOpen(true)}
                        item={selectedItem}
                    />
                )}
                {/* <PostDetail item={publisherData} /> */}
                <Publisher data={publisherData} />
                <button className="w-[200px]" onClick={() => openModal(newItem)}>
                    <CustomPieChart data={publisherData} />
                </button>
                <Tag titleList={publisherData.tags} />
                <div className="mt-2">
                    <LikeButton data={{ id: uniqueId, likeNum: likeNum }} />
                </div>
            </div>
        </>
    );
};
