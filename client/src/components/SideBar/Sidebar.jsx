import { NavLink } from "react-router-dom";
import { format } from "../../utils/helper";
import { useSelector } from "react-redux";
import { memo } from "react";

const Sidebar = () => {
    const { categories } = useSelector(state => state.appReducer)

    return (
        <div className="flex flex-col">{categories?.map((element) => (
            <NavLink
                key={format(element.title)}
                to={format(element.title)}
                className={({ isActive }) => isActive ? 'bg-main text-white px-5 pt-[15px] pb-[14px] text-sm hover:text-main': 'px-5 pt-[15px] pb-[14px] text-sm hover:text-main    '}
            >
                {element.title}
            </NavLink>
        ))}</div>
    )
};

export default memo(Sidebar);
