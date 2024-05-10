import { NavLink } from "react-router-dom";
import { IoMdHeart, IoMdHome, IoMdCompass, IoMdBookmark } from "react-icons/io";

import "./AsideLeft.css";
import { useDispatch } from "react-redux";
import { postModalVisibility } from "../../features/postModalSlice";

const AsideLeft = () => {
  const dispatch = useDispatch();
  const activeLink = ({ isActive }) => ({
    backgroundColor: isActive ? "rgb(215 228 255)" : "",
  });
  return (
    <div className="aside-nav-container">
      <nav className="aside-left-nav">
        <NavLink to="/" className="aside-left-nav-link" style={activeLink}>
          <div className="nav-icons">
            <IoMdHome />
          </div>
          <div>Home</div>
        </NavLink>
        <NavLink
          to="/explore"
          className="aside-left-nav-link"
          style={activeLink}
        >
          <div className="nav-icons">
            <IoMdCompass />
          </div>
          <div>Explore</div>
        </NavLink>
        <NavLink
          to="/bookmarks"
          className="aside-left-nav-link"
          style={activeLink}
        >
          <div className="nav-icons">
            <IoMdBookmark />
          </div>
          <div>Bookmarks</div>
        </NavLink>
        <NavLink
          to="/liked-post"
          className="aside-left-nav-link"
          style={activeLink}
        >
          <div className="nav-icons">
            <IoMdHeart />
          </div>
          <div>Likes</div>
        </NavLink>
      </nav>

      <button
        className="aside-left-post"
        onClick={() => dispatch(postModalVisibility(true))}
      >
        Post
      </button>
    </div>
  );
};

export default AsideLeft;
