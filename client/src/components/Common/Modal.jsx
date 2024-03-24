import React from 'react';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { showModal } from '../../store/appReducer';

const Modal = ({ children }) => {
    const dispatch = useDispatch();

    const handleVote = () => {
        dispatch(showModal({
            isShowModal: false,
            modalChildren: null
        }));
    };

    return (
        <div onClick={handleVote} className='absolute inset-0 z-50 flex items-center justify-center bg-overlay'>
            {children}
        </div>
    );
};

export default memo(Modal);