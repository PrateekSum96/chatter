import { useState } from "react";
import "./UserInfo.css";
import { IoIosSunny, IoIosMoon } from "react-icons/io";

const UserInfo = () => {
  const [themeDark, setThemeDark] = useState(false);
  return (
    <div className="user-info-container">
      <div className="dark-light-theme">
        <IoIosSunny className={"dark-light-icons"} />
        <div
          className="dark-light-toggle"
          onClick={() => setThemeDark(!themeDark)}
        >
          <div
            className={themeDark ? "theme-change-dark" : "theme-change-light"}
          ></div>
        </div>
        <IoIosMoon className="dark-light-icons" />
      </div>

      <div className="image-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Jack_Reacher-_Never_Go_Back_Japan_Premiere_Red_Carpet-_Tom_Cruise_%2835338493152%29_%28cropped%29.jpg/800px-Jack_Reacher-_Never_Go_Back_Japan_Premiere_Red_Carpet-_Tom_Cruise_%2835338493152%29_%28cropped%29.jpg"
          alt="user_image"
          id="user-image"
        />
        <div className="user-name">Prateek</div>
      </div>
    </div>
  );
};

export default UserInfo;
