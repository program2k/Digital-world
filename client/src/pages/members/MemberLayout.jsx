import React, { memo } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import path from '../../utils/path';
import { useSelector } from 'react-redux';
import MemberSidebar from './MemberSidebar';

const MemberLayout = () => {
    const { isLogin, current } = useSelector(state => state.userReducer);
    if (!isLogin || !current) {
        return <Navigate to={path.LOGIN} replace={true} />;
    }

    return (
        <div className='flex w-full bg-gray-200 min-h-screen relative text-black'>
            <div className='w-[327px] top-0 bottom-0 absolute flex-none'>
                <MemberSidebar />
            </div>
            <div className='w-[327px]'></div>
            <div className='flex-auto'>
                <Outlet />
            </div>
        </div>
    );
};


export default memo(MemberLayout);