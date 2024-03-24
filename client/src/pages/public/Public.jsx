import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import TopHeader from "../../components/Header/TopHeader";
import Footer from "../../components/Footer/Footer";
import { memo } from "react";
import { useSelector } from "react-redux";
// import Oauth2TopHeader from "../../components/Header/Oauth2TopHeader";

const Public = () => {
  // const { isOauth2Login } = useSelector(state => state.oauth2Reducer);
  return (
    <div className="w-full flex flex-col items-center">
      {/* {!isOauth2Login ? <TopHeader /> : <Oauth2TopHeader/>} */}
      <TopHeader />
      <Header />
      <Navigation />
      <div className="w-main">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default memo(Public);
