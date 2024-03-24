import React, { useState, useEffect, memo } from 'react';

const CountdownTimer = ({ number, unit }) => {
    return (
        <div className='w-[30%] h-[60px] border flex justify-center items-center bg-gray-200 rounded-sm'>
            <div className=''>
                <span className='text-[18px] text-gray-800'>{number}</span>
                <span className='text-xs text-gray-700'>{unit}</span>
            </div>
        </div>
    )
}



export default memo(CountdownTimer);
