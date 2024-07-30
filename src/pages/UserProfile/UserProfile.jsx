import "./UserProfile.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import UserPosts from "./UserPosts";
import UserDetail from "./UserDetail";
import { updateLoggedInUser } from "../../features/authSlice";
import {
  getAUser,
  getAllPostsOfAUser,
  updateAllUserList,
} from "../../features/userSlice";
import ProfileShimmer from "../../components/Shimmer/ProfileShimmer/ProfileShimmer";

const UserProfile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const [onLoadShimmer, setOnLoadShimmer] = useState(true);

  const editedUser = useSelector((store) => store.appUsers.user);
  const toggleEdit = useSelector((store) => store.appUsers.toggleEdit);
  const loggedInUser = useSelector((store) => store.auth.user);
  const user = useSelector((store) => store.appUsers.user);
  const allPosts = useSelector((store) => store.appPosts.allPosts);

  useEffect(() => {
    if (editedUser?._id === loggedInUser?._id) {
      dispatch(updateLoggedInUser(editedUser?.avatarUrl));
      dispatch(updateAllUserList(editedUser));
    }
    // eslint-disable-next-line
  }, [toggleEdit]);

  useEffect(() => {
    dispatch(getAllPostsOfAUser({ username }));
    // eslint-disable-next-line
  }, [username, allPosts]);

  useEffect(() => {
    dispatch(getAUser({ username }));
    setOnLoadShimmer(false);
    // eslint-disable-next-line
  }, [username, loggedInUser]);

  //shimmer

  if (username !== user?.username || onLoadShimmer) {
    return (
      <div>
        <ProfileShimmer />
      </div>
    );
  }

  return (
    <div className="user-profile">
      <UserDetail username={username} />
      <UserPosts />
    </div>
  );
};

export default UserProfile;
