import React, { memo } from 'react';

const ProductExtraInfo = ({ icon, title, sub }) => {
    return (
        <div className='flex justify-center p-2 mb-[10px] gap-4 border'>
            <span className='p-2 bg-gray-800 rounded-full flex items-center justify-center text-white'>{icon}</span>
            <div className='flex-col flex text-sm text-gray-500'>
                <span className='font-medium'>{title}</span>
                <span>{sub}</span>
            </div>
        </div>
    );
};

export default memo(ProductExtraInfo);