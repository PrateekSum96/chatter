import { useState } from "react";
import "./UserInfo.css";
import { IoIosSunny, IoIosMoon } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const navigate = useNavigate();
  const [themeDark, setThemeDark] = useState(false);
  const user = useSelector((store) => store.auth.user);

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
