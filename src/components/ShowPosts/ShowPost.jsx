import "./ShowPost.css";
import { useDispatch, useSelector } from "react-redux";

import {
  FaHeart,
  FaRegHeart,
  FaRegBookmark,
  FaBookmark,
  FaRegComment,
  FaRegShareSquare,
} from "react-icons/fa";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import { disLikePost, likePost } from "../../features/postSlice";
import { bookmarkPost, removeBookmarkPost } from "../../features/bookmarkSlice";

const ShowPost = ({ post }) => {
  const allUsers = useSelector((state) => state.appUsers?.allUsers);

  return (
    <div className="show-post-container">
      <UserInfo post={post} allUsers={allUsers} />
      <UserContentPost post={post} />
      <UserInteraction post={post} />
    </div>
  );
};

//components

const UserInfo = ({ post, allUsers }) => {
  const loggedInUser = useSelector((store) => store.auth?.user);
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
            <span>
              {post.firstname ? post.firstname : loggedInUser?.firstName}
            </span>
            <span>
              {post.lastname ? post.lastname : loggedInUser?.lastName}
            </span>
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
        {post.mediaURL?.includes("mp4") && (
          <video controls className="video-container-show-post">
            <source src={post.mediaURL} type="video/mp4" id="video-show-post" />
          </video>
        )}
      </div>
      <div>
        {post.mediaURL?.includes("webp") && (
          <img src={post.mediaURL} alt="post-media" id="image-show-post" />
        )}
      </div>
    </div>
  );
};

const UserInteraction = ({ post }) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((store) => store.auth.user);
  const bookmarkedPosts = useSelector(
    (store) => store.appBookmarks.bookmarkedPost
  );

  const isLoggedInUserLikedPost = post?.likes?.likedBy.some(
    (user) => user._id === loggedInUser._id
  );

  const isBookmarked = bookmarkedPosts.some(
    (bkPost) => bkPost._id === post._id
  );

  return (
    <div className="user-interaction-show-post">
      <div className="icon-show-post">
        {!isLoggedInUserLikedPost ? (
          <FaRegHeart onClick={() => dispatch(likePost(post._id))} />
        ) : (
          <FaHeart
            className="liked"
            onClick={() => dispatch(disLikePost(post._id))}
          />
        )}
        <span id="like-count-show-post">{post.likes.likeCount}</span>
      </div>

      <div className="icon-show-post">
        {isBookmarked ? (
          <FaBookmark onClick={() => dispatch(removeBookmarkPost(post._id))} />
        ) : (
          <FaRegBookmark onClick={() => dispatch(bookmarkPost(post._id))} />
        )}
      </div>

      <FaRegComment className="icon-show-post" />
      <FaRegShareSquare className="icon-show-post" />
    </div>
  );
};
export default ShowPost;
