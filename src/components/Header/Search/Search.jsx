import { IoMdSearch } from "react-icons/io";
import { MdClose } from "react-icons/md";

import "./Search.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../features/userSlice";
import AddPostContent from "../../AddPost/AddPostContent";
import Layover from "../../Layover/Layover";
import { postModalVisibility } from "../../../features/postModalSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { hideScrollBar } from "../../../utils/utilityFunction/hideScrollBar";
import { getAllPosts } from "../../../features/postSlice";

const Search = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchedText, setSearchedText] = useState("");
  const [searchedUser, setSearchedUser] = useState([]);
  const [searchedUserBox, setSearchedUserBox] = useState(false);
  const showPostModal = useSelector((store) => store.postModal.showPostModal);
  const allUsers = useSelector((store) => store.appUsers.allUsers);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllPosts());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    hideScrollBar(showPostModal);
  }, [showPostModal]);

  // scroll top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  //debouncing
  useEffect(() => {
    let timeSearch = setTimeout(() => {
      searchingUser();
    }, 500);
    return () => {
      clearTimeout(timeSearch);
    };
    // eslint-disable-next-line
  }, [searchedText]);

  //Function
  const searchingUser = () => {
    const userFound = allUsers.filter(
      ({ firstName, lastName, username }) =>
        firstName.toLowerCase().includes(searchedText.toLowerCase()) ||
        lastName.toLowerCase().includes(searchedText.toLowerCase()) ||
        username.toLowerCase().includes(searchedText.toLowerCase())
    );
    if (userFound) {
      setSearchedUser([...userFound]);
    }
  };

  return (
    <div className="search-container">
      <IoMdSearch id="search-icon" />

      <MdClose
        id="search-icon-close"
        onClick={() => {
          setSearchedText("");
          setSearchedUserBox(false);
        }}
      />
      <input
        type="text"
        value={searchedText}
        placeholder="Search"
        id="search-input"
        onChange={(e) => setSearchedText(e.target.value)}
        onFocus={() => setSearchedUserBox(true)}
      />
      {searchedUserBox && (
        <div className="searched-user-container">
          {searchedUser.length !== 0 ? (
            searchedUser?.map((user) => (
              <div
                key={user?._id}
                className="searched-user"
                onClick={() => {
                  navigate(`/profile/${user?.username}`);
                  setSearchedText(user?.username);
                  setSearchedUserBox(false);
                  setSearchedUser([{ ...user }]);
                }}
              >
                {user?.avatarUrl ? (
                  <img
                    src={user?.avatarUrl}
                    alt={user?.firstName}
                    id="searched-user-image-s"
                  />
                ) : (
                  <div className="no-avatar-s">
                    {user?.firstName.substring(0, 1)}
                  </div>
                )}

                <div className="searched-user-info-s">
                  <div>
                    <span>{user?.firstName}</span>
                    <span>{user?.lastName}</span>
                  </div>
                  <div>@{user?.username}</div>
                </div>
              </div>
            ))
          ) : (
            <div id="no-searched-user">No user found!</div>
          )}
        </div>
      )}

      <div>
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
    </div>
  );
};

export default Search;
