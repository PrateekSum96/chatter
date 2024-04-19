import { useDispatch, useSelector } from "react-redux";
import "./ShowGuestUser.css";
import { handleUserLogin } from "../../features/authSlice";

const ShowGuestUser = () => {
  const dispatch = useDispatch();
  const appUser = useSelector((store) => store.appUsers.allUsers);

  return (
    <div className="show-guest">
      {appUser?.map((user) => (
        <div
          key={user._id}
          role="button"
          className="show-guest-container"
          onClick={() =>
            dispatch(
              handleUserLogin({ email: user.email, password: user.password })
            )
          }
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
