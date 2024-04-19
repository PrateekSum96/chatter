import { useSelector } from "react-redux";
import "./ShowGuestUser.css";

const ShowGuestUser = ({ setUserData, handleLogIn }) => {
  const appUser = useSelector((store) => store.appUsers.allUsers);

  const handleGuestLogin = (guestUser) => {
    const { email, password } = guestUser;
    setUserData((user) => ({
      ...user,
      email,
      password,
    }));

    handleLogIn(email, password);
  };
  return (
    <div className="show-guest">
      {appUser?.map((user) => (
        <div
          key={user._id}
          role="button"
          className="show-guest-container"
          onClick={() => handleGuestLogin(user)}
        >
          <img src={user.avatarUrl} alt="guest-user" id="guest-user-img" />
          <div className="guest-user-detail">
            <div className="guest-name">
              <span> {user.firstName}</span>
              <span>{user.lastName}</span>
            </div>
            <div>@{user.username}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowGuestUser;
