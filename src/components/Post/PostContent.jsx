import { useDispatch, useSelector } from "react-redux";

import { MdEmojiEmotions, MdImage } from "react-icons/md";
import "./PostContent.css";
import { useState } from "react";
import { addPost } from "../../features/postSlice";
const PostContent = () => {
  const dispatch = useDispatch();
  const [postInput, setPostInput] = useState();
  const userLoggedIn = useSelector((store) => store.auth.user);
  const handlePostClick = () => {
    dispatch(addPost(postInput));
    setPostInput("");
  };
  return (
    <div className="post-content-container">
      <div className="post-input-pc">
        <div className="img-container-pc">
          <img
            src={userLoggedIn?.avatarUrl}
            alt="post-user-img"
            id="image-pc"
          />
        </div>

        <textarea
          placeholder="What's happening?"
          className="post-input-div-pc"
          value={postInput}
          onChange={(e) => setPostInput(e.target.value)}
        ></textarea>
      </div>
      <div className="post-action-pc">
        <div>
          <MdImage className="icon-pc" />
          <MdEmojiEmotions className="icon-pc" />
        </div>
        <button onClick={handlePostClick}>Post</button>
      </div>
    </div>
  );
};

export default PostContent;
