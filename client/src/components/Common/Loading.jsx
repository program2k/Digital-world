import React, { memo } from 'react';
import { HashLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div>
            <HashLoader color='red'/>
        </div>
    );
};

export default memo(Loading);
