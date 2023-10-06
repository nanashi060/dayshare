import { FC } from 'react';
import Modal from 'react-modal';

const customStyles: ReactModal.Styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },

    content: {
        top: 'auto',
        left: '0',
        right: 'auto',
        bottom: '0px',
        marginRight: '0',
        width: '100%',
        height: '80%',
        borderRadius: '20px 20px 20px 20px',
        border: '0px',
        padding: '0',
        backgroundColor: 'rgba(255,255,255,1)',
    },
};

type Prop = {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    openDetailModal: () => void;
};

const DetailModal: FC<Prop> = ({ isOpen, openModal, closeModal }) => {
    return <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}></Modal>;
};

export default DetailModal;
