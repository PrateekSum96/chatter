import "./ShowPost.css";
import { useSelector } from "react-redux";

import {
  FaRegHeart,
  FaRegBookmark,
  FaRegComment,
  FaRegShareSquare,
} from "react-icons/fa";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";

const ShowPost = ({ post }) => {
  // console.log(post);
  const allUsers = useSelector((state) => state.appUsers?.allUsers);

  return (
    <div className="show-post-container">
      <UserInfo post={post} allUsers={allUsers} />
      <UserContentPost post={post} />
      <UserInteraction post={post} />
    </div>
  );
};

const UserInfo = ({ post, allUsers }) => {
  const getUserImage = allUsers?.find(
    (user) => user.username === post.username
  );
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleString("default", {
      month: "short",
    })} ${date.getDate()}, ${date.getFullYear()}`;
  };
  return (
    <div className="userinfo-container-show-post">
      <div className="user-info-show-post">
        <img
          src={getUserImage?.avatarUrl}
          alt="user-avatar"
          id="user-image-show-post"
        />
        <div className="username-show-post">
          <div>
            <span>{post.firstname}</span>
            <span>{post.lastname}</span>
          </div>
          <div className="post-username-show-post">@{post.username}</div>
        </div>
        <div className="postdate-show-post">{formatDate(post.createdAt)}</div>
      </div>
      <PiDotsThreeOutlineVerticalLight className="icon-post-show-post" />
    </div>
  );
};

const UserContentPost = ({ post }) => {
  return (
    <div className="user-content-show-post">
      <div>{post.content}</div>
      <div>
        {post.mediaURL.includes("mp4") && (
          <video controls className="video-container-show-post">
            <source src={post.mediaURL} type="video/mp4" id="video-show-post" />
          </video>
        )}
      </div>
      <div>
        {post.mediaURL.includes("webp") && (
          <img src={post.mediaURL} alt="post-media" id="image-show-post" />
        )}
      </div>
    </div>
  );
};

const UserInteraction = ({ post }) => {
  return (
    <div className="user-interaction-show-post">
      <div className="icon-show-post">
        <FaRegHeart />
        <span id="like-count-show-post">{post.likes.likeCount}</span>
      </div>
      <FaRegBookmark className="icon-show-post" />
      <FaRegComment className="icon-show-post" />
      <FaRegShareSquare className="icon-show-post" />
    </div>
  );
};
export default ShowPost;
