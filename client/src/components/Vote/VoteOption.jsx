import React from 'react';
import { memo, useRef, useEffect, useState } from 'react';
import logo from '../../assets/meme.jpg';
import { voteOptions } from '../../utils/constants';
import icons from '../../utils/icons';
import Button from '../Button/Button';

const VoteOption = ({ productName, handleSubmitVoteOptions }) => {
    const { AiFillStar } = icons;
    const modalRef = useRef();
    const [chosenStar, setChosenStar] = useState(null);
    const [comment, setComment] = useState('');

    const handleStopPropagation = (event) => {
        event.stopPropagation();
    };

    const handleComment = (event) => {
        setComment(event.target.value);
    };

    useEffect(() => {
        modalRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, []);

    return (
        <div onClick={handleStopPropagation} ref={modalRef} className='w-[700px] h-[600px] rounded-2xl bg-white p-4 flex flex-col gap-4 items-center justify-center'>
            <img src={logo} alt="logo" />
            <h2 className='text-center text-medium text-lg font-semibold'>{`Đánh giá & nhận xét ${productName}`}</h2>
            <textarea
                className='form-textarea rounded-lg w-full placeholder:italic placeholder:text-sm'
                cols="30" rows="10"
                placeholder='Xin mời chia sẻ một số cảm nhận về sản phẩm'
                value={comment}
                onChange={handleComment}
            >
            </textarea>
            <div className='w-full flex flex-col gap-4 border justify-center items-center'>
                <p className='font-semibold'>Bạn thấy sản phẩm này như thế nào?</p>
                <div className='flex items-center justify-center rounded-lg'>
                    {voteOptions.map(element => (
                        <div
                            key={element.id}
                            className='p-4 cursor-pointer flex items-center justify-center flex-col gap-4 '
                            onClick={() => setChosenStar(element.id)}
                        >
                            <span>{element.text}</span>
                            {(Number(chosenStar) && chosenStar >= element.id) ? <AiFillStar color='orange' /> : <AiFillStar color='gray' />}
                        </div>
                    ))}
                </div>
            </div>
            <Button name='Gửi đánh giá' handleOnClick={() => handleSubmitVoteOptions({ comment, score: chosenStar })} fw/>
        </div>
    );
};

export default memo(VoteOption);