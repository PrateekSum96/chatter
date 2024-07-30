import "./Home.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ShowPost from "../../components/ShowPosts/ShowPost";

import { getUserPosts, homePostShimmerTrue } from "../../features/postSlice";
import PageShimmer from "../../components/Shimmer/PageShimmer/PageShimmer";
import { getTrendingPost } from "../../utils/utilityFunction/getTendingPost";
import { getLatestPost } from "../../utils/utilityFunction/getLatestPost";
import AsideRight from "../../components/AsideRight/AsideRight";

const Home = () => {
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((store) => store.auth.user);
  const userHomePosts = useSelector((store) => store.appPosts.userHomePost);
  const allPosts = useSelector((store) => store.appPosts.allPosts);
  const sortBy = useSelector((store) => store.appPosts.sortBy);
  const homePostShimmer = useSelector(
    (store) => store.appPosts.homePostShimmer
  );
  useEffect(() => {
    dispatch(getUserPosts({ username: userLoggedIn?.username }));
    // eslint-disable-next-line
  }, [allPosts]);

  useEffect(() => {
    return () => {
      dispatch(homePostShimmerTrue());
    };
    // eslint-disable-next-line
  }, []);

  // latest or trending
  let showHomePost = [];
  if (sortBy === "latest") {
    showHomePost = getLatestPost(userHomePosts);
  } else {
    showHomePost = getTrendingPost(userHomePosts);
  }

  //shimmer
  if (homePostShimmer) {
    return (
      <div>
        <PageShimmer />
      </div>
    );
  }

  return (
    <div className="home">
      <AsideRight />
      {/* <AddPostContent /> */}
      {showHomePost?.length === 0 ? (
        <p className="no-post-home">No Posts Yet!</p>
      ) : (
        showHomePost?.map((post) => (
          <div key={post._id}>
            <ShowPost post={post} />
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
