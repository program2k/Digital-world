import React, { memo, Fragment, useState } from 'react';
import logo from '../../assets/logo_digital_new_250x.png';
import { adminSidebars } from '../../utils/constants';
import { NavLink, Link } from 'react-router-dom';
import clsx from 'clsx'
import icons from '../../utils/icons';
import path from '../../utils/path';
import Button from '../Button/Button';

const AdminSidebar = () => {
    const { AiOutlineDown } = icons;
    const activedStyle = 'px-4 py-2 flex items-center gap-2 bg-blue-500';
    const notActivedStyle = 'px-4 py-2 flex items-center gap-2 hover:bg-blue-200';
    const [active, setActive] = useState([]);

    const handleShowTabs = (tabId) => {
        if (active.some(element => element === tabId)) {
            setActive(prev => prev.filter(element => element !== tabId));
        } else {
            setActive(prev => [...prev, tabId]);
        }
    };  

    return (
        <div className=' bg-white h-full py-4'>
            <div className='flex flex-col items-center justify-center p-4 gap-2'>
                <img src={logo} alt="logo" className='w-[200px] object-contain' />
                <small>Admin Workspace</small>
            </div>
            <div className=''>
                {adminSidebars.map((element, index) => (
                    <Fragment key={index}>
                        {element.type === 'single' &&
                            <NavLink className={({ isActive }) => clsx(isActive && activedStyle, !isActive && notActivedStyle)} to={element.path}>
                                <span>{element.icon}</span>
                                {element.text}
                            </NavLink>}
                        {element.type === 'parent' &&
                            <div className='flex flex-col text-black' onClick={() => handleShowTabs(element.id)}>
                                <div className='flex items-center justify-between gap-2 px-4 py-2 hover:bg-blue-500'>
                                    <div className='flex items-center gap-2'>
                                        <span>{element.icon}</span>
                                        <span>{element.text}</span>
                                    </div>
                                    <AiOutlineDown />
                                </div>
                                {active.some(id => id === element.id) && (
                                    <div className='flex flex-col pl-10' >
                                        {element.submenu.map((item, index) => (
                                            <NavLink
                                                to={item.path}
                                                key={index}
                                                className={({ isActive }) => clsx(isActive && activedStyle, !isActive && notActivedStyle)}
                                            >
                                                {item.text}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        }
                    </Fragment>
                ))}
            </div>
            <Link to={`/${path.HOME}`}>
                <Button name='Quay lại trang chủ' fw/>
            </Link>
        </div>
    );
};

export default memo(AdminSidebar);