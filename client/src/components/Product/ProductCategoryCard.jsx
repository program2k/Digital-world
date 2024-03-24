import React, { memo } from 'react';

const ProductCategoryCard = ({ images, title }) => {
    return (
        <div className='w-2/3 flex-auto px-[10px] mb-5'>
            <div className='flex w-full gap-8'>
                <img src={images} alt="images" className='w-[144px] flex-1 h-[129px] object-cover mt-5' />
                <div className='flex flex-col mt-[15px] items-start gap-1 w-full text-xs'>
                    <span className='line-clamp-1 text-sm font-semibold uppercase'>{title}</span>
                </div>
            </div>
        </div>
    );
};

export default memo(ProductCategoryCard);