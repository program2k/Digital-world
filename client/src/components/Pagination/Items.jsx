import React, { memo } from 'react';
import { createSearchParams, useNavigate, useSearchParams, useLocation } from 'react-router-dom'

const Items = ({ children }) => {
    const [param] = useSearchParams();
    const navigation = useNavigate();
    const location = useLocation();

    const handlePaginations = () => {
        let params = [];
        for (let i of param.entries()) {
            params.push(i);
        }
        const queries = {};
        for (let i of params) {
            queries[i[0]] = i[1];
        }
        if (Number(children)) {
            queries.page = children;
        }
        navigation({
            pathname: location.pathname,
            search: createSearchParams(queries).toString(),
        })
    }

    return (
        <button
            className={`w-10 h-10 flex cursor-pointer justify-center
                        ${!Number(children) && 'items-end p-2'}
                        ${Number(children) && 'rounded-full hover:rounded-full hover:bg-gray-300'}
                        ${+param.get('page') === children && 'rounded-full bg-gray-300'}
                        ${(!+param.get('page') === children && +children === 1) && 'rounded-full bg-gray-300'}`
                      }
            onClick={handlePaginations}
            type='button'
            disabled={!Number(children)}
        >
            {children}
        </button>
    );
};

export default memo(Items);