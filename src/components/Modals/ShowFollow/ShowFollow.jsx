import "./ShowFollow.css";

const ShowFollow = ({ userData }) => {
  const { firstName, lastName, username, avatarUrl } = userData;
  return (
    <div className="show-follow-sf">
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
