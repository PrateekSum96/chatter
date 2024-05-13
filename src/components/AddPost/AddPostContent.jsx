import { useDispatch, useSelector } from "react-redux";
import { MdEmojiEmotions, MdImage, MdClose } from "react-icons/md";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useRef, useState } from "react";
import { addPost } from "../../features/postSlice";
import { postModalVisibility } from "../../features/postModalSlice";
import { emojis } from "../../utils/Constants/constants";

import "./AddPostContent.css";

const AddPostContent = () => {
  const dispatch = useDispatch();
  const initialState = {
    content: "",
    mediaURL: "",
  };
  const [postInput, setPostInput] = useState(initialState);
  const [emojiContainer, setEmojiContainer] = useState(false);
  const showPostModal = useSelector((store) => store.postModal.showPostModal);
  const userLoggedIn = useSelector((store) => store.auth.user);

  const imageRef = useRef();

  const handlePostClick = () => {
    dispatch(addPost(postInput));
    setPostInput(initialState);
    setEmojiContainer(false);
    imageRef.current.value = null;
    if (showPostModal) {
      dispatch(postModalVisibility(false));
    }
  };
  return (
    <div className="post-content-container">
      <div className="post-input-pc">
        <div className="img-container-pc">
          {userLoggedIn?.avatarUrl ? (
            <img
              src={userLoggedIn?.avatarUrl}
              alt="post-user-img"
              id="image-pc"
            />
          ) : (
            <div>{userLoggedIn?.firstName?.substring(0, 1)}</div>
          )}
        </div>
        <div className="media-container-apc">
          <textarea
            placeholder="What's happening?"
            className="post-input-div-pc"
            value={postInput.content}
            onChange={(e) =>
              setPostInput({ ...postInput, content: e.target.value })
            }
          ></textarea>

          {postInput.mediaURL && (
            <div>
              <IoCloseCircleSharp
                id="remove-upload-image-pc"
                onClick={() => {
                  imageRef.current.value = null;
                  setPostInput({ ...postInput, mediaURL: "" });
                }}
              />
              <img src={postInput.mediaURL} alt="avatar" id="input-img-apc" />
            </div>
          )}
        </div>
      </div>
      <div className="post-action-pc">
        <div>
          <MdImage
            className="icon-pc"
            onClick={() => imageRef.current.click()}
          />

          <input
            type="file"
            hidden
            ref={imageRef}
            onChange={() => {
              setPostInput({
                ...postInput,
                mediaURL: URL.createObjectURL(imageRef.current.files[0]),
              });
            }}
          />

          {!emojiContainer ? (
            <MdEmojiEmotions
              className="icon-pc"
              onClick={() => setEmojiContainer(true)}
            />
          ) : (
            <MdClose
              className="icon-pc"
              onClick={() => setEmojiContainer(false)}
            />
          )}

          <div
            className="emojis"
            id={`${emojiContainer ? "emojis-animate" : ""}`}
          >
            {emojis?.map(({ emoji, name }) => (
              <span
                key={name}
                onClick={() =>
                  setPostInput({
                    ...postInput,
                    content: postInput.content.concat(emoji),
                  })
                }
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>

        <button
          id={`${
            postInput.content === "" && postInput.mediaURL === ""
              ? "disabled-btn"
              : ""
          }`}
          disabled={postInput.content === "" && postInput.mediaURL === ""}
          onClick={handlePostClick}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default AddPostContent;
