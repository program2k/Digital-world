import React, { memo, Fragment, useState } from 'react';
import avatar from '../../assets/avt.png';
import { memberSidebars } from '../../utils/constants';
import { NavLink, Link } from 'react-router-dom';
import clsx from 'clsx'
import icons from '../../utils/icons';
import path from '../../utils/path';
import Button from '../../components/Button/Button';
import { useSelector } from 'react-redux';

const MemberSidebar = () => {
    const { AiOutlineDown } = icons;
    const activedStyle = 'px-4 py-2 flex items-center gap-2 bg-blue-500';
    const notActivedStyle = 'px-4 py-2 flex items-center gap-2 hover:bg-blue-200';
    const [active, setActive] = useState([]);
    const { current } = useSelector(state => state.userReducer);
    console.log(current)

    const handleShowTabs = (tabId) => {
        if (active.some(element => element === tabId)) {
            setActive(prev => prev.filter(element => element !== tabId));
        } else {
            setActive(prev => [...prev, tabId]);
        }
    };  

    return (
        <div className=' bg-white h-full py-4'>
            <div className='w-full flex flex-col items-center py-4'>
                <img src={current?.avatar || avatar} alt="avatar" className='w-[170px] h-[170px] rounded-full object-cover' />
                <small className='text-lg mt-2'>{`${current?.firstName} ${current?.lastName}`}</small>
            </div>
            <div className=''>
                {memberSidebars.map((element, index) => (
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

export default memo(MemberSidebar);