import { useDispatch, useSelector } from "react-redux";
import ShowPost from "../../components/ShowPosts/ShowPost";
import AddPostContent from "../../components/AddPost/AddPostContent";
import "./Home.css";
import { useEffect } from "react";
import {
  getUserPosts,
  homePostShimmerTrue,
  latestPost,
  trendingPost,
} from "../../features/postSlice";

import PageShimmer from "../../components/Shimmer/PageShimmer/PageShimmer";

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
    dispatch(getUserPosts(userLoggedIn?.username));
    // eslint-disable-next-line
  }, [allPosts]);

  useEffect(() => {
    if (sortBy === "latest") {
      dispatch(latestPost());
    } else {
      dispatch(trendingPost());
    }
    // eslint-disable-next-line
  }, [sortBy, allPosts, userHomePosts]);

  useEffect(() => {
    return () => {
      dispatch(homePostShimmerTrue());
    };
    // eslint-disable-next-line
  }, []);

  if (homePostShimmer) {
    return (
      <div>
        <PageShimmer />
      </div>
    );
  }

  return (
    <div className="home">
      <AddPostContent />
      {userHomePosts?.length === 0 ? (
        <p className="no-post-home">No Posts Yet!</p>
      ) : (
        userHomePosts?.map((post) => (
          <div key={post._id}>
            <ShowPost post={post} />
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
