import React, { memo } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import path from '../../utils/path';
import { useSelector } from 'react-redux';
import AdminSidebar from '../../components/SideBar/AdminSidebar';

const AdminLayout = () => {
    const { isLogin, current } = useSelector(state => state.userReducer);
    if (!isLogin || !current || current.role !== 'admin') {
        return <Navigate to={path.LOGIN} replace={true} />;
    }


    return (
        <div className='flex w-full bg-gray-200 min-h-screen relative text-black'>
            <div className='w-[327px] top-0 bottom-0 absolute flex-none'>
                <AdminSidebar />
            </div>
            <div className='w-[327px]'></div>
            <div className='flex-auto'>
                <Outlet />
            </div>
        </div>
    );
};

export default memo(AdminLayout);