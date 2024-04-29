import { useDispatch } from "react-redux";
import "./ShowUsersAR.css";
import { followUser } from "../../features/authSlice";

const ShowUsersAR = ({ user }) => {
  const dispatch = useDispatch();
  const { firstName, lastName, username, avatarUrl, _id } = user;

  return (
    <div className="show-user-container-su" onClick={() => console.log("cont")}>
      <div className="img-container-su">
        {avatarUrl ? (
          <img src={avatarUrl} alt="user-img" id="user-img-su" />
        ) : (
          firstName.substring(0, 1)
        )}
      </div>
      <div className="user-info-container-su">
        <div className="user-name-su">
          <span>{firstName}</span>
          <span>{lastName}</span>
        </div>
        <div>@{username}</div>
      </div>
      <div className="f-btn-container-su">
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(followUser(_id));
          }}
        >
          Follow
        </button>
      </div>
    </div>
  );
};

export default ShowUsersAR;
