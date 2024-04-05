import { Outlet } from "react-router-dom";
import AsideLeft from "../components/AsideLeft/AsideLeft";
import Header from "../components/Header/Header";
import AsideRight from "../components/AsideRight/AsideRight";

const AppLayout = () => {
  return (
    <div>
      <Header />
      <AsideLeft />
      <Outlet />
      <AsideRight />
    </div>
  );
};

export default AppLayout;
