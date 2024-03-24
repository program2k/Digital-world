import { Fragment, memo, useEffect, useState } from "react";
import logo from "../../assets/logo_digital_new_250x.png";
import icons from "../../utils/icons";
import path from "../../utils/path";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../../store/userSlice";
import withBase from "../../HOCS/withBase";
import { showCart } from "../../store/appReducer";

const Header = ({ dispatch }) => {
  const { RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle } = icons;
  const { current } = useSelector((state) => state.userReducer);
  const { isLogin } = useSelector((state) => state.userReducer);
  const [isShowOption, setIsShowOption] = useState(false);

  const handleStopPropagation = (event) => {
    event.stopPropagation();
  };

  const handleShowOption = () => {
    setIsShowOption(!isShowOption);
  };

  const handleLogOut = () => {
    dispatch(logout());
  };

  const handleClickOutside = (event) => {
    const profile = document.getElementById("profile");
    if (profile && !profile.contains(event.target)) {
      setIsShowOption(false);
    }
  };

  const handleShowCart = () => {
    dispatch(showCart({ signal: true }));
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="border-b w-main flex justify-between h-[110px] py-[35px]">
      <div>
        <Link to={`/${path.HOME}`}>
          <img
            src={logo}
            alt="logo_digital_new_250x.png"
            className="w-[234px] object-contain"
          />
        </Link>
      </div>
      <div className="flex text-[13px]">
        <div className="flex flex-col items-center px-6 border-r">
          <span className="flex gap-1 items-center">
            <RiPhoneFill color="red" />
            <span className="font-semibold">0367860328</span>
          </span>
          <span>Mon-Sat 9:00AM - 5:00PM</span>
        </div>
        <div className="flex flex-col items-center px-6 border-r">
          <span className="flex gap-1 items-center">
            <MdEmail color="red" />
            <span className="font-semibold"> zzzhuyyzzz@gmail.com</span>
          </span>
          <span>Online Support 24/7</span>
        </div>
        {current && (
          <Fragment>
            <div
              onClick={handleShowCart}
              className="flex items-center justify-center gap-2 px-6 border-r cursor-pointer"
            >
              <BsHandbagFill color="red" />
              <span>{`${current?.carts?.length} item(s)` || "0 item(s)"}</span>
            </div>
            <div
              className="flex items-center justify-center gap-2 px-6 cursor-pointer relative"
              onClick={handleShowOption}
              id="profile"
            >
              <FaUserCircle color="red" size={24} />
              <span>Profile</span>
              {isShowOption && (
                <div
                  onClick={handleStopPropagation}
                  className="absolute top-full flex flex-col left-[16px] bg-gray-100 border min-w-[50px] py-2"
                >
                  <Link
                    className="p-2 hover:bg-sky-100 w-full"
                    to={`/${path.MEMBER}/${path.PERSONAL}`}
                  >
                    Personal
                  </Link>
                  {current?.role === "admin" && (
                    <Link
                      className="p-2 hover:bg-sky-100 w-full"
                      to={`/${path.ADMIN}/${path.DASHBOARD}`}
                    >
                      Admin Workspace
                    </Link>
                  )}
                  <span
                    className="p-2 hover:bg-sky-100 w-full"
                    onClick={handleLogOut}
                  >
                    Logout
                  </span>
                </div>
              )}
            </div>
          </Fragment>
        )}
        {/* {(isOauth2Login && oauth2Current) && (
          <Fragment>
            <div onClick={handleShowCart} className="flex items-center justify-center gap-2 px-6 border-r cursor-pointer">
              <BsHandbagFill color="red" />
              <span>{`${oauth2Current?.carts?.length} item(s)` || '0 item(s)'}</span>
            </div>
            <div
              className="flex items-center justify-center gap-2 px-6 cursor-pointer relative"
              onClick={handleShowOption}
              id="profile"
            >
              <FaUserCircle color="red" size={24} />
              <span>Profile</span>
              {isShowOption && (
                <div onClick={handleStopPropagation} className="absolute top-full flex flex-col left-[16px] bg-gray-100 border min-w-[50px] py-2">
                  <Link className="p-2 hover:bg-sky-100 w-full" to={`/${path.MEMBER}/${path.PERSONAL}`}>Personal</Link>
                  {oauth2Current?.role === 'admin' && (
                    <Link className="p-2 hover:bg-sky-100 w-full" to={`/${path.ADMIN}/${path.DASHBOARD}`}>Admin Workspace</Link>
                  )}
                  <span className="p-2 hover:bg-sky-100 w-full" onClick={handleLogOut}>Logout</span>
                </div>
              )}
            </div>
          </Fragment>
        )} */}
      </div>
    </div>
  );
};

export default withBase(memo(Header));
