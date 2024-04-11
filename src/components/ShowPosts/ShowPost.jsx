import "./ShowPost.css";
import { useSelector } from "react-redux";

const ShowPost = ({ post }) => {
  // console.log(post);
  const userSliceStatus = useSelector((state) => state.appUsers.allUsers);

  return (
    <div className="show-post-container">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default ShowPost;
