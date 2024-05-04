import { IoMdSearch } from "react-icons/io";

import "./Search.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBookmarkedPost } from "../../../features/bookmarkSlice";
import { getAllPosts } from "../../../features/postSlice";
import { getAllUsers } from "../../../features/userSlice";

const Search = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getBookmarkedPost());
    dispatch(getAllUsers());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="search-container">
      <IoMdSearch id="search-icon" />
      <input type="text" id="search-input" />
    </div>
  );
};

export default Search;
