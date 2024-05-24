import { useDispatch } from "react-redux";
import "./ShowUsersAR.css";
import { followUser } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";

const ShowUsersAR = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { firstName, lastName, username, avatarUrl } = user;

  return (
    <div
      className="show-user-container-su"
      onClick={() => navigate(`/profile/${username}`)}
    >
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
            dispatch(followUser({ followUserId: user._id }));
          }}
        >
          Follow
        </button>
      </div>
    </div>
  );
};

export default ShowUsersAR;
