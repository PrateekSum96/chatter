import { useRef, useState } from "react";
import { editUserPost, setPostLayover } from "../../../features/postSlice";
import { TiDelete } from "react-icons/ti";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { FaImage } from "react-icons/fa6";
import { toast } from "react-toastify";
import "./EditPost.css";

const EditPost = ({ post, setShowEditModal, showEditModal }) => {
  const dispatch = useDispatch();
  const mediaRef = useRef();

  const postInitialState = {
    content: post?.content,
    mediaURL: post?.mediaURL,
  };
  const [postContent, setPostContent] = useState(postInitialState);
  const [imageSize, setImageSize] = useState(0);
  // console.log(showEditModal, post);
  return (
    <div
      className="edit-post-modal"
      id={`${showEditModal ? "edit-post-modal-id-ep" : ""}`}
    >
      <div className="edit-post-header">
        <div>Edit Post</div>
        <MdClose
          id="close-modal-ep"
          onClick={(e) => {
            setShowEditModal(false);
            dispatch(setPostLayover(false));
            e.stopPropagation();
          }}
        />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (imageSize <= 100) {
            dispatch(editUserPost({ postId: post._id, postData: postContent }));
            dispatch(setPostLayover(false));
            setShowEditModal(false);
          } else {
            toast.error("File size exceeds 100KB limit.");
          }
        }}
      >
        <div className="post-content-ep">
          <textarea
            id="text-input-ep"
            value={postContent?.content}
            onChange={(e) => {
              setPostContent({ ...postContent, content: e.target.value });
            }}
          ></textarea>
          {postContent?.mediaURL && (
            <div className="media-container-ep">
              <TiDelete
                id="media-delete-ep"
                onClick={() => {
                  setPostContent({ ...postContent, mediaURL: "" });
                  setImageSize(0);
                  mediaRef.current.value = null;
                }}
              />
              <div>
                {postContent.mediaURL?.includes("mp4") && (
                  <video controls className="media-ep">
                    <source src={postContent?.mediaURL} type="video/mp4" />
                  </video>
                )}
              </div>
              <div>
                {(postContent.mediaURL?.includes("webp") ||
                  postContent.mediaURL?.includes("blob")) && (
                  <img
                    src={postContent?.mediaURL}
                    alt="post-media"
                    className="media-ep"
                  />
                )}
              </div>
            </div>
          )}
        </div>
        <div>
          <input
            type="file"
            ref={mediaRef}
            id="add-file-ep"
            onChange={() => {
              setPostContent({
                ...postContent,
                mediaURL: URL.createObjectURL(mediaRef.current.files[0]),
              });
              setImageSize(mediaRef.current.files[0].size / 1024);
            }}
          />
        </div>

        <div className="user-action-ep">
          <FaImage
            id="upload-image-ep"
            onClick={() => {
              mediaRef.current.click();
            }}
          />
          <button id="edit-post-btn-ep">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
