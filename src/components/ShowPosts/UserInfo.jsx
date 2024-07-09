import "./ShowPost.css";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";

import Layover from "../Layover/Layover";
import EditPost from "../Modals/EditPost/EditPost";
import { formatDate } from "../../utils/utilityFunction/formateDate";
import { hideScrollBar } from "../../utils/utilityFunction/hideScrollBar";
import { deletePost, setPostLayover } from "../../features/postSlice";
import { deleteComment } from "../../features/commentSlice";
import EditComment from "../Modals/EditComment/EditComment";

export const UserInfo = ({ post, allUsers, fromComment, comment }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const refPostControl = useRef();
  const [showPostControl, setPostControl] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const loggedInUser = useSelector((store) => store.auth?.user);
  const showLayover = useSelector((store) => store.appPosts.postLayover);

  useEffect(() => {
    hideScrollBar(showLayover);
    // eslint-disable-next-line
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

  const getUserFromUsername = allUsers?.find((user) => {
    if (fromComment) {
      return user?.username === comment?.username;
    } else {
      return user?.username === post?.username;
    }
  });
  return (
    <div className="userinfo-container-show-post">
      <div
        className="user-info-show-post"
        onClick={(e) => {
          navigate(`/profile/${getUserFromUsername.username}`);
          e.stopPropagation();
        }}
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
          <div className="post-username-show-post">
            @{getUserFromUsername?.username}
          </div>
        </div>
        <div className="postdate-show-post">
          {fromComment ? "" : formatDate(post?.createdAt)}
        </div>
      </div>
      {loggedInUser.username === getUserFromUsername?.username && (
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
          <div
            onClick={() => {
              !fromComment && dispatch(deletePost({ postId: post?._id }));
              fromComment &&
                dispatch(
                  deleteComment({ postId: post?._id, commentId: comment?._id })
                );

              if (pathname.includes("/post/")) {
                !fromComment &&
                  navigate(`/profile/${getUserFromUsername.username}`);
              }
            }}
          >
            Delete
          </div>
        </div>
      )}
      <div
        className="show-layover-modal-ui"
        id={`${showEditModal ? "show-layover-modal-id-ui" : ""}`}
      >
        {!fromComment && (
          <EditPost
            post={post}
            setShowEditModal={setShowEditModal}
            showEditModal={showEditModal}
          />
        )}
        {fromComment && (
          <EditComment
            post={post}
            comment={comment}
            setShowEditModal={setShowEditModal}
            showEditModal={showEditModal}
          />
        )}
      </div>
      {showEditModal && <Layover showLayover={showLayover} />}
    </div>
  );
};
