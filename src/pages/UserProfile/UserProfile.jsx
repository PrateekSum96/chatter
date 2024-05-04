import { useParams } from "react-router-dom";
import "./UserProfile.css";
import UserPosts from "./UserPosts";
import UserDetail from "./UserDetail";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateLoggedInUser } from "../../features/authSlice";
import { updateAllUserList } from "../../features/userSlice";

const UserProfile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const editedUser = useSelector((store) => store.appUsers.user);
  const toggleEdit = useSelector((store) => store.appUsers.toggleEdit);
  const loggedInUser = useSelector((store) => store.auth.user);

  useEffect(() => {
    if (editedUser?._id === loggedInUser?._id) {
      dispatch(updateLoggedInUser(editedUser?.avatarUrl));
      dispatch(updateAllUserList(editedUser));
    }
    // eslint-disable-next-line
  }, [toggleEdit]);

  return (
    <div className="user-profile">
      <UserDetail username={username} />
      <UserPosts username={username} />
    </div>
  );
};

export default UserProfile;
