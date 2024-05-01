import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAUser } from "../../features/userSlice";
import "./UserDetail.css";
import { followUser, logOutUser, unFollowUser } from "../../features/authSlice";
import { clearBookmarks } from "../../features/bookmarkSlice";

const UserDetail = ({ username }) => {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.appUsers.user);
  const loggedInUser = useSelector((store) => store.auth.user);
  const userPost = useSelector((store) => store.appUsers.allPostsUser);

  useEffect(() => {
    dispatch(getAUser(username));
    // eslint-disable-next-line
  }, [username, loggedInUser]);

  //function
  const isFollowing = loggedInUser?.following.some(
    (x) => x?.username === username
  );

  return (
    <div className="user-detail">
      <div>
        {user?.avatarUrl ? (
          <img src={user?.avatarUrl} alt="user-img" className="user-image-ud" />
        ) : (
          <div className="user-not-image-ud">
            {user?.firstName.substring(0, 1)}
          </div>
        )}
      </div>
      <div className="user-info-detail-ud">
        <div className="user-name-detail-ud">
          <div className="user-name-ud">
            <p>
              <span>{user?.firstName}</span>
              <span>{user?.lastName}</span>
            </p>
            <p>@{user?.username}</p>
          </div>
          <div className="user-button-ud">
            {loggedInUser?._id === user?._id && <button>Edit</button>}
            {isFollowing
              ? loggedInUser?._id !== user?._id && (
                  <button
                    onClick={(e) => {
                      dispatch(unFollowUser(user?._id));
                    }}
                  >
                    Following
                  </button>
                )
              : loggedInUser?._id !== user?._id && (
                  <button
                    onClick={(e) => {
                      dispatch(followUser(user?._id));
                    }}
                  >
                    Follow
                  </button>
                )}
            {loggedInUser?._id === user?._id && (
              <button
                onClick={() => {
                  dispatch(logOutUser());
                  dispatch(clearBookmarks());
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
        <p id="user-bio-ud">{user?.bio}</p>
        <a href={user?.website} id="user-website-ud">
          {user?.website}
        </a>
        <div className="user-follow-info-ud">
          <p>
            {userPost?.length}
            <span>posts</span>
          </p>
          <p>
            {user?.followers?.length}
            <span>followers</span>
          </p>
          <p>
            {user?.following?.length}
            <span>followings</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
