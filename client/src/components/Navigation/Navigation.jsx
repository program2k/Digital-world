import { memo } from "react";
import { navigations } from "../../utils/constants";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="w-main h-[48px] py-2 border-y text-sm flex items-center">
      {navigations.map((navigations, index) => (
        <NavLink
          to={navigations.path}
          key={index}
          className={({ isActive }) =>
            isActive
              ? "pr-12 hover:text-main text-main"
              : "pr-12 hover:text-main"
          }
        >
          {navigations.value}
        </NavLink>
      ))}
    </div>
  );
};

export default memo(Navigation);
