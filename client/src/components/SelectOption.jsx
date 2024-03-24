import { memo } from 'react';

const SelectOption = ({ icon }) => {
    return (
        <div className="w-10 h-10 bg-white rounded-full border shadow-md cursor-pointer flex items-center ml-3 justify-center hover:bg-red-200">
            {icon}
        </div>
    )
}

export default memo(SelectOption);