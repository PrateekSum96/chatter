import { NavLink } from "react-router-dom";
import "./AsideLeftNav.css";

const AsideLeftNav = () => {
  return (
    <div className="aside-left-nav">
      <div className="app-name">chatter</div>
      <nav className="nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/explore">Explore</NavLink>
        <NavLink to="/bookmark">Bookmarks</NavLink>
        <NavLink to="/likedPage">Likes</NavLink>
      </nav>
      <div>Profile</div>
    </div>
  );
};

export default AsideLeftNav;
