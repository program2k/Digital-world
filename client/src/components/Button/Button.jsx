import React, { memo } from 'react';

const Button = ({ name, handleOnClick, style, iconBefore, iconAfter, fw, type = 'button' }) => {
    return (
        <button
            className={style ? style : `h-[40px] px4 py2 rounded-md my-4 flex flex-col items-center text-white bg-main font-semibold ${fw ? 'w-full' : 'w-fit'} hover:bg-red-400`}
            type={type}
            onClick={() => { handleOnClick && handleOnClick() }}
        >
            <span className='mt-2'>{iconBefore}{name}{iconAfter}</span>
        </button>
    );
};

export default memo(Button);