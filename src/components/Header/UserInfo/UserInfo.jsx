import "./UserInfo.css";
import { IoIosSunny, IoIosMoon } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onDarkMode } from "../../../features/darkModeSlice";

const UserInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const darkMode = useSelector((store) => store.colorMode.darkMode);
  const user = useSelector((store) => store.auth.user);

  return (
    <div className="user-info-container">
      <div className="dark-light-toggle">
        <IoIosSunny
          className={`${darkMode ? "sunny" : ""} dark-light-icons`}
          onClick={() => {
            dispatch(onDarkMode(false));
          }}
        />
        <div
          className={darkMode ? "theme-change-dark" : "theme-change-light"}
          id="toggle-pointer"
        ></div>
        <IoIosMoon
          className={`${darkMode ? "" : "moon"} dark-light-icons`}
          onClick={() => {
            dispatch(onDarkMode(true));
          }}
        />
      </div>

      <div
        className="user-login-ui"
        onClick={() => {
          navigate(`/profile/${user?.username}`);
        }}
      >
        <div className="image-container">
          {user?.avatarUrl ? (
            <img src={user?.avatarUrl} alt="user_image" id="user-image" />
          ) : (
            <div>{user?.firstName.substring(0, 1)}</div>
          )}
        </div>

        <div className="user-name-ui">
          <div className="user-fn-ln-ui">
            <span>{user?.firstName}</span>
            <span>{user?.lastName}</span>
          </div>
          <div id="username-ui">@{user?.username}</div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
