import "./ShowPost.css";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaRegBookmark,
  FaBookmark,
  FaRegComment,
  FaRegShareSquare,
} from "react-icons/fa";

import { disLikePost, likePost, loadingStatus } from "../../features/postSlice";
import { bookmarkPost, removeBookmarkPost } from "../../features/bookmarkSlice";
import { UserInfo } from "./UserInfo";

const ShowPost = ({ post }) => {
  const allUsers = useSelector((store) => store.appUsers?.allUsers);
  return (
    <div className="show-post-container">
      <UserInfo post={post} allUsers={allUsers} />
      <UserContentPost post={post} />
      <UserInteraction post={post} />
    </div>
  );
};

//COMPONENTS

//UserContentPost

const UserContentPost = ({ post }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  return (
    <div
      className="user-content-show-post"
      onClick={() => {
        if (!pathname.includes("/post/")) {
          dispatch(loadingStatus());
          navigate(`/post/${post._id}`);
        }
      }}
    >
      <div>{post?.content}</div>
      <div>
        {post?.mediaURL?.includes("mp4") && (
          <video controls className="video-container-show-post">
            <source src={post.mediaURL} type="video/mp4" id="video-show-post" />
          </video>
        )}
      </div>
      <div>
        {(post?.mediaURL?.includes("webp") ||
          post?.mediaURL?.includes("blob")) && (
          <img src={post?.mediaURL} alt="post-media" id="image-show-post" />
        )}
      </div>
    </div>
  );
};

//UserInteraction
const UserInteraction = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const loggedInUser = useSelector((store) => store.auth.user);
  const bookmarkedPosts = useSelector(
    (store) => store.appBookmarks.bookmarkedPost
  );

  const isLoggedInUserLikedPost = post?.likes?.likedBy.some(
    (user) => user._id === loggedInUser._id
  );

  const isBookmarked = bookmarkedPosts?.some(
    (bkPost) => bkPost._id === post._id
  );
  return (
    <div className="user-interaction-show-post">
      <div className="icon-show-post" onClick={(e) => e.stopPropagation()}>
        {!isLoggedInUserLikedPost ? (
          <FaRegHeart
            onClick={() => dispatch(likePost({ postId: post?._id }))}
          />
        ) : (
          <FaHeart
            className="liked"
            onClick={() => dispatch(disLikePost({ postId: post._id }))}
          />
        )}
        <span className="like-count-show-post">{post?.likes.likeCount}</span>
      </div>

      <div className="icon-show-post" onClick={(e) => e.stopPropagation()}>
        {isBookmarked ? (
          <FaBookmark
            onClick={() => dispatch(removeBookmarkPost({ postId: post._id }))}
          />
        ) : (
          <FaRegBookmark
            onClick={() => dispatch(bookmarkPost({ postId: post._id }))}
          />
        )}
      </div>
      <div
        className="icon-show-post"
        onClick={() => {
          if (!pathname.includes("/post/")) {
            navigate(`/post/${post._id}`);
          }
        }}
      >
        <FaRegComment />
        <span className="like-count-show-post">{post?.comments?.length}</span>
      </div>
      <FaRegShareSquare
        className="icon-show-post"
        onClick={(e) => {
          e.stopPropagation();
          navigator.clipboard.writeText(
            `https://app-chatter.netlify.app/post/${post._id}`
          );
          toast.success("Link copied!");
        }}
      />
    </div>
  );
};
export default ShowPost;
