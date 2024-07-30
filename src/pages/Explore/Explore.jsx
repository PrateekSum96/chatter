import { useDispatch, useSelector } from "react-redux";
import ShowPost from "../../components/ShowPosts/ShowPost";

import "./Explore.css";
import PageShimmer from "../../components/Shimmer/PageShimmer/PageShimmer";
import { useEffect } from "react";
import { getAllPosts } from "../../features/postSlice";
import { getLatestPost } from "../../utils/utilityFunction/getLatestPost";

const Explore = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector((store) => store.appPosts.allPosts);
  const showShimmer = useSelector((store) => store.appPosts.showShimmer);

  const latestPost = getLatestPost(allPosts);

  useEffect(() => {
    dispatch(getAllPosts());
    // eslint-disable-next-line
  }, []);

  if (showShimmer) {
    return (
      <div>
        <PageShimmer />
      </div>
    );
  }

  return (
    <div className="explore">
      {latestPost?.map((post) => (
        <div key={post._id}>
          <ShowPost post={post} />
        </div>
      ))}
    </div>
  );
};

export default Explore;
