import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAUser, setLayover } from "../../features/userSlice";
import { followUser, logOutUser, unFollowUser } from "../../features/authSlice";
import { clearBookmarks } from "../../features/bookmarkSlice";
import EditProfile from "../../components/Modals/EditProfile/EditProfile";
import Layover from "../../components/Layover/Layover";
import ShowFollow from "../../components/Modals/ShowFollow/ShowFollow";
import { MdClose } from "react-icons/md";

import "./UserDetail.css";

const UserDetail = ({ username }) => {
  const dispatch = useDispatch();

  const [showEditProfile, setEditProfile] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowings, setShowFollowings] = useState(false);

  const user = useSelector((store) => store.appUsers.user);
  const loggedInUser = useSelector((store) => store.auth.user);
  const userPost = useSelector((store) => store.appUsers.allPostsUser);
  const layover = useSelector((store) => store.appUsers.showLayover);

  useEffect(() => {
    dispatch(getAUser(username));
    // eslint-disable-next-line
  }, [username, loggedInUser]);

  useEffect(() => {
    if (layover) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [layover]);

  //function
  const isFollowing = loggedInUser?.following.some(
    (x) => x?.username === username
  );

  return (
    <div className="user-detail">
      <Layover showLayover={layover} />
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
            {loggedInUser?._id === user?._id && (
              <button
                onClick={() => {
                  dispatch(setLayover(true));
                  setEditProfile(true);
                }}
              >
                Edit
              </button>
            )}
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
            <span
              className="follow-ud"
              onClick={() => {
                dispatch(setLayover(true));
                setShowFollowers(true);
              }}
            >
              followers
            </span>
          </p>
          <p>
            {user?.following?.length}
            <span
              className="follow-ud"
              onClick={() => {
                setShowFollowings(true);
                dispatch(setLayover(true));
              }}
            >
              followings
            </span>
          </p>
        </div>
      </div>

      <div
        className="show-edit-profile-class-ud"
        id={`${showEditProfile ? "show-edit-profile-ud" : ""}`}
      >
        <EditProfile
          user={user}
          setEditProfile={setEditProfile}
          showEditProfile={showEditProfile}
        />
      </div>

      <div
        className="show-followers"
        id={`${showFollowers ? "show-followers-id-ud" : ""}`}
      >
        <div className="heading-modal-ud">
          <div className="follower-title-ud">Followers</div>
          <MdClose
            className="cross-followers-ud"
            onClick={() => {
              setShowFollowers(false);
              dispatch(setLayover(false));
            }}
          />
        </div>
        <div>
          {user?.followers?.length === 0 ? (
            <div className="no-follow-msg">No follower Yet!</div>
          ) : (
            user?.followers?.map((followers) => (
              <div key={followers?._id}>
                <ShowFollow
                  userData={followers}
                  closeModalFunc={setShowFollowers}
                />
              </div>
            ))
          )}
        </div>
      </div>

      <div
        className="show-followers"
        id={`${showFollowings ? "show-following-id-ud" : ""}`}
      >
        <div className="heading-modal-ud">
          <div className="follower-title-ud">Followings</div>
          <MdClose
            className="cross-followers-ud"
            onClick={() => {
              setShowFollowings(false);
              dispatch(setLayover(false));
            }}
          />
        </div>

        <div>
          {user?.following?.length === 0 ? (
            <div className="no-follow-msg">No Following Yet!</div>
          ) : (
            user?.following?.map((following) => (
              <div key={following?._id}>
                <ShowFollow
                  userData={following}
                  closeModalFunc={setShowFollowings}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
