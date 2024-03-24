import React, { useRef, useEffect } from 'react';
import { memo } from 'react';
import icons from '../../utils/icons';

const VoteBar = ({ number, ratingCount, ratingTotal }) => {
    const { AiFillStar } = icons;
    const percent = useRef();

    useEffect(() => {
        percent.current.style.cssText = `right: ${100 - Math.round(ratingCount * 100 / ratingTotal)}%`;
    }, [ratingCount, ratingTotal]);

    return (
        <div className='flex items-center gap-2'>
            <div className='flex flex-1 items-center justify-center gap-1 text-sm'>
                <span>{number}</span>
                <AiFillStar color='orange' />
            </div>
            <div className='flex-8'>
                <div className='w-full relative h-1 bg-gray-200 rounded-l-full rounded-r-full'>
                    <div ref={percent} className='absolute inset-0 bg-red-500 right-2'>

                    </div>
                </div>
            </div>
            <div className='flex-2 flex justify-end text-400 text-xs'>{`${ratingCount || 0} đánh giá`}</div>
        </div>
    );
};

export default memo(VoteBar);