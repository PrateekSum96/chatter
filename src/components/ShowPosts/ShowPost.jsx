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
import {
  deletePost,
  disLikePost,
  likePost,
  setPostLayover,
} from "../../features/postSlice";
import { bookmarkPost, removeBookmarkPost } from "../../features/bookmarkSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Layover from "../Layover/Layover";
import EditPost from "../Modals/EditPost/EditPost";

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

//components

//UserInfo
const UserInfo = ({ post, allUsers }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refPostControl = useRef();
  const [showPostControl, setPostControl] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const loggedInUser = useSelector((store) => store.auth?.user);
  const showLayover = useSelector((store) => store.appPosts.postLayover);

  //modal-open-hide-scrollbar
  useEffect(() => {
    if (showLayover) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showLayover]);

  //outside click close box
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showPostControl]);

  const handleClickOutside = (e) => {
    if (!refPostControl.current?.contains(e.target)) {
      setPostControl(false);
    }
  };

  const getUserFromUsername = allUsers?.find(
    (user) => user?.username === post?.username
  );

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleString("default", {
      month: "short",
    })} ${date.getDate()}, ${date.getFullYear()}`;
  };
  return (
    <div className="userinfo-container-show-post">
      <div
        className="user-info-show-post"
        onClick={() => navigate(`/profile/${post.username}`)}
      >
        {getUserFromUsername?.avatarUrl ? (
          <img
            src={getUserFromUsername?.avatarUrl}
            alt="user-avatar"
            id="user-image-show-post"
          />
        ) : (
          <div className="no-avatar-sp">
            {loggedInUser?.firstName.substring(0, 1)}
          </div>
        )}

        <div className="username-show-post">
          <div>
            <span>{getUserFromUsername?.firstName}</span>
            <span>{getUserFromUsername?.lastName}</span>
          </div>
          <div className="post-username-show-post">@{post?.username}</div>
        </div>
        <div className="postdate-show-post">{formatDate(post?.createdAt)}</div>
      </div>
      {loggedInUser.username === post?.username && (
        <div
          ref={refPostControl}
          onClick={() => {
            setPostControl((prev) => !prev);
          }}
        >
          <PiDotsThreeOutlineVerticalLight className="icon-post-show-post" />
        </div>
      )}

      {showPostControl && (
        <div className="post-control-sp">
          <div
            onClick={() => {
              setShowEditModal(!showEditModal);
              dispatch(setPostLayover(true));
            }}
          >
            Edit
          </div>
          <div onClick={() => dispatch(deletePost(post?._id))}>Delete</div>
        </div>
      )}
      {showEditModal && <Layover showLayover={showLayover} />}
      {showEditModal && (
        <EditPost post={post} setShowEditModal={setShowEditModal} />
      )}
    </div>
  );
};

//UserContentPost

const UserContentPost = ({ post }) => {
  const navigate = useNavigate();
  return (
    <div
      className="user-content-show-post"
      onClick={() => navigate(`/post/${post._id}`)}
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
      <div className="icon-show-post">
        {!isLoggedInUserLikedPost ? (
          <FaRegHeart onClick={() => dispatch(likePost(post._id))} />
        ) : (
          <FaHeart
            className="liked"
            onClick={() => dispatch(disLikePost(post._id))}
          />
        )}
        <span id="like-count-show-post">{post?.likes.likeCount}</span>
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
