import { useDispatch, useSelector } from "react-redux";
import ShowPost from "../../components/ShowPosts/ShowPost";
import "./Home.css";
import { useEffect } from "react";
import {
  latestPost,
  showHomePost,
  trendingPost,
} from "../../features/postSlice";
import PostContent from "../../components/Post/PostContent";

const Home = () => {
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((store) => store.auth.user);
  const userHomePosts = useSelector((store) => store.appPosts.userHomePost);
  const allUsersPosts = useSelector((store) => store.appPosts.allPosts);
  const sortBy = useSelector((store) => store.appPosts.sortBy);

  useEffect(() => {
    dispatch(showHomePost(userLoggedIn));
    // eslint-disable-next-line
  }, [userLoggedIn, allUsersPosts]);

  useEffect(() => {
    if (sortBy === "latest") {
      dispatch(latestPost());
    } else {
      dispatch(trendingPost());
    }
    // eslint-disable-next-line
  }, [sortBy, allUsersPosts, userLoggedIn]);

  return (
    <div className="home">
      <PostContent />
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
