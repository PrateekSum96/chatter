import { Outlet } from "react-router-dom";

import AsideLeft from "../components/AsideLeft/AsideLeft";
import AsideRight from "../components/AsideRight/AsideRight";
import AppLogo from "../components/Header/Logo/AppLogo";
import Search from "../components/Header/Search/Search";
import UserInfo from "../components/Header/UserInfo/UserInfo";

import "./AppLayout.css";

const AppLayout = () => {
  return (
    <div className="app-layout">
      <div className="app-logo-pl">
        <AppLogo />
      </div>
      <div className="search-pl">
        <Search />
      </div>
      <div className="user-info-pl">
        <UserInfo />
      </div>
      <div className="aside-left-pl">
        <AsideLeft />
      </div>
      <div className="outlet-pl">
        <Outlet />
      </div>
      <div className="aside-right-pl">
        <AsideRight />
      </div>
    </div>
  );
};

export default AppLayout;
