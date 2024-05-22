import { useState } from "react";
import "./AddComment.css";
import { useDispatch } from "react-redux";
import { addNewComment } from "../../features/commentSlice";

const AddComment = ({ postId }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  return (
    <div className="add-comment-ac">
      <textarea
        id="comment-text-area"
        placeholder="Reply..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button
        className="comment-btn"
        id={`${comment?.length === 0 ? "disabled-comment-btn" : ""}`}
        disabled={comment?.length === 0}
        onClick={() => {
          dispatch(addNewComment({ postId, commentData: comment }));
          setComment("");
        }}
      >
        Reply
      </button>
    </div>
  );
};

export default AddComment;
