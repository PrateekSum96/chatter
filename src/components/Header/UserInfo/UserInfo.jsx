import { useState } from "react";
import "./UserInfo.css";
import { IoIosSunny, IoIosMoon } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../../features/authSlice";

const UserInfo = () => {
  const dispatch = useDispatch();
  const [themeDark, setThemeDark] = useState(false);
  const user = useSelector((store) => store.auth.user);
  const { firstName, lastName, username, avatarUrl } = user;

  return (
    <div className="user-info-container">
      <div
        className="dark-light-toggle"
        onClick={() => setThemeDark(!themeDark)}
      >
        <IoIosSunny className={"dark-light-icons"} />
        <div
          className={themeDark ? "theme-change-dark" : "theme-change-light"}
          id="toggle-pointer"
        ></div>
        <IoIosMoon className="dark-light-icons" />
      </div>

      <div className="user-login-ui" onClick={() => dispatch(logOutUser())}>
        <div className="image-container">
          {avatarUrl ? (
            <img src={avatarUrl} alt="user_image" id="user-image" />
          ) : (
            <div>{firstName.substring(0, 1)}</div>
          )}
        </div>

        <div className="user-name-ui">
          <div className="user-fn-ln-ui">
            <span>{firstName}</span>
            <span>{lastName}</span>
          </div>
          <div id="username-ui">@{username}</div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
