import React, { memo } from 'react';
import { formatPrice, renderStars } from '../../utils/helper';

const ProductCard = ({ images, title, totalRatings, price }) => {
    return (
        <div className='w-1/3 flex-auto px-[10px] mb-5'>
            <div className='flex w-full border gap-8'>
                <img src={images} alt="images" className='w-[90px] object-contain' />
                <div className='flex flex-col mt-[15px] items-start gap-1 w-full text-xs'>
                    <span className='line-clamp-1 text-sm'>{title}</span>
                    <span className='flex mt-4 items-center justify-center'>{renderStars(totalRatings)}</span>
                    <span className='flex mt-4 items-center justify-center'>{formatPrice(price)} VND</span>
                </div>
            </div>
        </div>
    );
};

export default memo(ProductCard);