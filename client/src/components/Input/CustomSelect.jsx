import React, { memo } from 'react';
import Select from 'react-select';
import clsx from 'clsx';

const CustomSelect = ({ label, placeholder, onChange, options = [], value = '', className, wrapClassname }) => {

    console.log(value);
    return (
        <div className={clsx(wrapClassname)}>
            {label && <h3 className='font-medium'>{label}</h3>}
            <Select
                placeholder={placeholder}
                isClearable
                options={options}
                value={value}
                isSearchable
                onChange={value => onChange(value)}
                formatOptionLabel={(option) => {
                    return (
                        <div className='flex items-center text-black gap-2'>
                            <span>{option.label}</span>
                        </div>
                    )
                }}
                className={{ control: () => clsx('border-2 py-[2px]', className) }}
            />
        </div>
    );
};

export default memo(CustomSelect);