import React from 'react';
import { memo } from 'react';

const SelectionInputField = ({ value, changeValue, options}) => {
    const handleOnChange = (event) => {
        changeValue(event.target.value);
    };

    return (
        <div>
            <select className='form-select text-sm' value={value} onChange={handleOnChange}>
                <option value="">Choose</option>
                {options?.map((element, index) => (
                    <option key={index} value={element.value}>{element.text}</option>
                ))}
            </select>
        </div>
    );
};

export default memo(SelectionInputField);