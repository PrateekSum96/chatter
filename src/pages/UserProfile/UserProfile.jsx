import { useParams } from "react-router-dom";
import "./UserProfile.css";
import UserPosts from "./UserPosts";
import UserDetail from "./UserDetail";

const UserProfile = () => {
  const { username } = useParams();

  return (
    <div className="user-profile">
      <UserDetail username={username} />
      <UserPosts username={username} />
    </div>
  );
};

export default UserProfile;
