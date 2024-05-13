import { IoMdSearch } from "react-icons/io";
import { MdClose } from "react-icons/md";

import "./Search.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookmarkedPost } from "../../../features/bookmarkSlice";
import { getAllPosts } from "../../../features/postSlice";
import { getAllUsers } from "../../../features/userSlice";
import AddPostContent from "../../AddPost/AddPostContent";
import Layover from "../../Layover/Layover";
import { postModalVisibility } from "../../../features/postModalSlice";

const Search = () => {
  const dispatch = useDispatch();
  const showPostModal = useSelector((store) => store.postModal.showPostModal);

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getBookmarkedPost());
    dispatch(getAllUsers());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (showPostModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showPostModal]);

  return (
    <div className="search-container">
      <IoMdSearch id="search-icon" />
      <input type="text" id="search-input" />
      <Layover showLayover={showPostModal} />

      <div
        className="add-post-content-s"
        id={`${showPostModal ? "show-post-modal-s" : ""}`}
      >
        <MdClose
          id="cross-post-modal-s"
          onClick={() => dispatch(postModalVisibility(false))}
        />
        <AddPostContent />
      </div>
    </div>
  );
};

export default Search;
