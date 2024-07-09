import { useDispatch, useSelector } from "react-redux";
import ShowUsersAR from "./ShowUsersAR";
import { MdOutlineFiberNew, MdTrendingUp } from "react-icons/md";

import "./AsideRight.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { sortPost } from "../../features/postSlice";

const AsideRight = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [usersToFollow, setUsersToFollow] = useState();

  const appUsersList = useSelector((store) => store.appUsers.allUsers);
  const userLoggedInInfo = useSelector((store) => store.auth.user);
  const sortByPost = useSelector((store) => store.appPosts.sortBy);

  const usersNotFollowing = appUsersList.filter(
    (user) =>
      userLoggedInInfo?.following.every((x) => x._id !== user._id) &&
      userLoggedInInfo._id !== user._id
  );

  useEffect(() => {
    setUsersToFollow(usersNotFollowing);
    // eslint-disable-next-line
  }, [userLoggedInInfo]);
  return (
    <div className="aside-right-container">
      {pathname === "/" && (
        <div className="filter-sort-ar">
          <button
            id={`${sortByPost === "trending" ? "sort-active" : ""}`}
            onClick={() => dispatch(sortPost("trending"))}
          >
            <MdTrendingUp className="icon-ar" />
            Trending
          </button>
          <button
            id={`${sortByPost === "latest" ? "sort-active" : ""}`}
            onClick={() => dispatch(sortPost("latest"))}
          >
            <MdOutlineFiberNew className="icon-ar" />
            Latest
          </button>
        </div>
      )}
      <div className="user-list-ar">
        {usersToFollow?.length !== 0 && <h2>Suggestions for you</h2>}
        {usersToFollow?.slice(0, 5).map((user) => (
          <div key={user._id}>
            <ShowUsersAR user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AsideRight;
