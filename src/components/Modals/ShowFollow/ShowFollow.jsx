import { useNavigate } from "react-router-dom";
import "./ShowFollow.css";
import { useDispatch } from "react-redux";
import { setLayover } from "../../../features/userSlice";

const ShowFollow = ({ userData, closeModalFunc }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { firstName, lastName, username, avatarUrl } = userData;
  return (
    <div
      className="show-follow-sf"
      onClick={() => {
        navigate(`/profile/${username}`);
        dispatch(setLayover(false));
        closeModalFunc(false);
      }}
    >
      <img src={avatarUrl} alt="user-img" className="show-avatar-sf" />
      <div className="user-info-sf">
        <div>
          <span>{firstName}</span>
          <span>{lastName}</span>
        </div>
        <div>@{username}</div>
      </div>
    </div>
  );
};

export default ShowFollow;
