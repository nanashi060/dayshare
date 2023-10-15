import React from 'react';
import { FC } from 'react';
import Modal from 'react-modal';
import { RxCross2 } from 'react-icons/rx';
import CommentList from './CommentList';
import { Publisher } from 'components/PieChart/PublisherDetail';
import { CustomPieChart } from 'components/PieChart/CustomPieChart';
import { Tag } from 'components/PieChart/Tag';
import { LikeButton } from 'components/PieChart/LikeButton';
import { CommentComponent } from 'components/PieChart/CommentComponent';

const customStyles: ReactModal.Styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    content: {
        top: 'auto',
        left: 'auto',
        right: 'auto',
        bottom: 'auto',
        width: '488px',
        height: 'auto',
        borderRadius: '20px 20px 20px 20px',
        border: '0px',
        padding: '30px',
        backgroundColor: 'white',
    },
};

type Prop = {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    item: any;
};

const PostDetailModal: FC<Prop> = ({ isOpen, openModal, closeModal, item }) => {
    const discription = 'コード書くの久しぶりだったな〜！';
    const data = [
        { name: '山田太郎', time: '2021/10/10 10:10', comment: '受験勉強と両立してて偉い👍' },
        { name: '山田花子', time: '2021/10/10 10:10', comment: 'でしょ' },
    ];
    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
            <button className="block ml-auto " onClick={closeModal}>
                <RxCross2 size={30} />
            </button>
            <div>
                <Publisher data={item} />
                <div className="flex justify-center">
                    <CustomPieChart data={item} />
                </div>
                <div className="max-w-[300px] ml-[34px]">{item.details}</div>
                <div className="pt-6 pl-[34px]">
                    <Tag titleList={item.tags} />
                </div>
                <div className="pt-2">
                    <LikeButton data={item} />
                </div>
                <div className="border-b pt-3 border-[#B7B7B7]"></div>
                <CommentComponent postID={item.id}/>
            </div>
        </Modal>
    );
};

export default PostDetailModal;
