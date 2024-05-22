import { useSelector } from "react-redux";
import "./ShowComment.css";
import { UserInfo } from "../ShowPosts/UserInfo";

const ShowComment = ({ comment }) => {
  const allUsers = useSelector((store) => store.appUsers.allUsers);
  const post = useSelector((store) => store.appPosts.post);
  return (
    <div className="comment-box-sc">
      <UserInfo allUsers={allUsers} comment={comment} fromComment post={post} />
      <div className="text-comment">{comment?.commentData}</div>
    </div>
  );
};

export default ShowComment;
