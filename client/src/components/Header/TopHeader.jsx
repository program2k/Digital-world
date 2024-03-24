import React, { memo, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import path from "../../utils/path";
import { getUser, getOauth2User } from "../../store/asyncUserAction";
import { useDispatch, useSelector } from "react-redux";
import icons from "../../utils/icons";
import { logout } from "../../store/userSlice";

const TopHeader = () => {
  const { AiOutlineLogout } = icons;
  const dispatch = useDispatch();
  const { isLogin, isOauth2Login, current, token } = useSelector(
    (state) => state.userReducer
  );

  useEffect(() => {
    const setTimeOutId = setTimeout(() => {
      if (isLogin && !isOauth2Login) {
        console.log("da chay vao day 1");
        dispatch(getUser());
        // }
      }
    }, 300);
    return () => {
      clearTimeout(setTimeOutId);
    };
  }, [dispatch, isLogin]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="h-[50px] w-full bg-main flex items-center justify-center">
      <div className="w-main flex items-center justify-between text-xs text-white">
        <span>ORDER ONLINE OR CALL US 0367860328 </span>
        {isLogin ? (
          <span className="flex gap-3">
            <AiOutlineLogout
              className="cursor-pointer mt-0.5 hover:rounded-full hover:text-main bg-gray-200 p-2"
              size={18}
              onClick={handleLogout}
            />
            <span>{`Welcome, ${current?.firstName} ${current?.lastName}`}</span>
          </span>
        ) : (
          <Link to={`/${path.LOGIN}`} className="hover:text-gray-800">
            Sign in or create account
          </Link>
        )}
      </div>
    </div>
  );
};

export default memo(TopHeader);
