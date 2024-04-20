import { useSelector } from "react-redux";
import ShowUsersAR from "./ShowUsersAR";

import "./AsideRight.css";

const AsideRight = () => {
  const appUsersList = useSelector((store) => store.appUsers.allUsers);
  const userLoggedInInfo = useSelector((store) => store.auth.user);
  const usersNotFollowing = appUsersList.filter(
    (user) =>
      userLoggedInInfo?.following.every((x) => x._id !== user._id) &&
      userLoggedInInfo._id !== user._id
  );
  return (
    <div className="aside-right-container">
      <h2>Suggested Users</h2>
      {usersNotFollowing?.slice(0, 5).map((user) => (
        <div key={user._id}>
          <ShowUsersAR user={user} />
        </div>
      ))}
    </div>
  );
};

export default AsideRight;
