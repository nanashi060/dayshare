import { LikeButton } from 'components/PieChart/LikeButton';
import { PieChart } from 'components/PieChart/PieChart';
import { Publisher } from 'components/PieChart/PublisherDetail';
import { Tag } from 'components/PieChart/Tag';
import React from 'react';
import { FC } from 'react';
import Modal from 'react-modal';
import { RxCross2 } from 'react-icons/rx';
import CommentList from './CommentList';

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
};

const Detail: FC<Prop> = ({ isOpen, openModal, closeModal }) => {
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
                <Publisher />
                <div className="flex justify-center">
                    <PieChart />
                    <div className="h-[190px] rounded-full w-[190px] bg-red-200"></div>
                </div>
                <div className="max-w-[300px] ml-[34px]">{discription}</div>
                <div className="pt-6 pl-[34px]">
                    <Tag titleList={['大学生']} />
                </div>
                <div className="pt-2">
                    <LikeButton />
                </div>
                <div className="border-b pt-3 border-[#B7B7B7]"></div>
                <CommentList data={data} />
            </div>
        </Modal>
    );
};

export default Detail;
