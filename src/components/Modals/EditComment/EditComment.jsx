import "./EditComment.css";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";

import { setPostLayover } from "../../../features/postSlice";
import { updateComment } from "../../../features/commentSlice";

const EditComment = ({ post, comment, setShowEditModal, showEditModal }) => {
  const dispatch = useDispatch();
  const [commentToEdit, setCommentToEdit] = useState(comment?.commentData);

  return (
    <div
      className="edit-comment-ec"
      id={`${showEditModal ? "edit-comment-modal-id-ec" : ""}`}
    >
      <div className="edit-comment-header">
        <div>Edit Comment</div>
        <MdClose
          id="close-comment-modal"
          onClick={(e) => {
            setShowEditModal(false);
            dispatch(setPostLayover(false));
            e.stopPropagation();
          }}
        />
      </div>
      <div className="text-area-comment-edit-container">
        <textarea
          name=""
          id="text-area-edit-comment"
          value={commentToEdit}
          onChange={(e) => setCommentToEdit(e.target.value)}
        ></textarea>
      </div>
      <div className="btn-edit-comment-container">
        <button
          id="btn-edit-comment"
          onClick={() => {
            dispatch(
              updateComment({
                postId: post?._id,
                commentId: comment?._id,
                commentData: commentToEdit,
              })
            );
            setShowEditModal(false);
            dispatch(setPostLayover(false));
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditComment;
