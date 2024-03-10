import { Outlet } from "react-router-dom";
import AsideLeftNav from "../../components/asideLeftNavigation/AsideLeftNav";
import AsideRight from "../../components/asdeRight/AsideRight";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="home-aside-left-nav">
        <AsideLeftNav />
      </div>
      <div className="home-outlet">
        <Outlet />
      </div>
      <div className="home-aside-right">
        <AsideRight />
      </div>
    </div>
  );
};

export default Home;
