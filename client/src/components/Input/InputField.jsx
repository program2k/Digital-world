import React, { memo } from 'react';
import clsx from 'clsx';

const InputField = ({ value, setValue, nameKey, type, invalidFields, setInvalidFields, style, placeholder }) => {

    const handleOnChange = (event) => {
        setValue((prev) => ({ ...prev, [nameKey]: event.target.value }))
    };

    const handleOnFocus = () => {
        if(setInvalidFields){
            setInvalidFields([]);
        } else {
            return;
        }
    }

    return (
        <div className='w-full flex flex-col relative'>
            {value && value?.trim() !== '' && (
                <label
                    className='text-[10px] absolute top-0 left-[12px] block bg-white px-1 animate-slide-top-sm'
                    htmlFor={nameKey}
                >
                    {nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}
                </label>
            )}
            <input
                type={type || 'text'}
                className={clsx('px-4 py-2 w-full border border-gray-200 my-2 rounded-md placeholder:text-sm placeholder:italic', style)}
                placeholder={placeholder || nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}
                value={value}
                onChange={handleOnChange}
                onFocus={handleOnFocus}
            />
            {invalidFields?.some((element) => element.name === nameKey) &&
                <small className='text-main text-[10px] italic'>{invalidFields.find((element) => element.name === nameKey)?.message}</small>}
        </div>
    );
};

export default memo(InputField);