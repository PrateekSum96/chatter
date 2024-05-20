import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PageShimmer from "../../components/Shimmer/PageShimmer/PageShimmer";
import ShowPost from "../../components/ShowPosts/ShowPost";
import "./LikedPost.css";
import { useLatestPost } from "../../utils/CustomHooks/useLatestPost";

const LikedPost = () => {
  const [likedPosts, setLikedPosts] = useState([]);
  const [onLoadShimmer, setOnLoadShimmer] = useState(true);
  const userLoggedIn = useSelector((store) => store.auth.user);
  const allPosts = useSelector((store) => store.appPosts.allPosts);
  useEffect(() => {
    const posts = allPosts?.filter((post) =>
      post.likes.likedBy.find((user) => user._id === userLoggedIn._id)
    );
    setLikedPosts(posts);
    setOnLoadShimmer(false);
    // eslint-disable-next-line
  }, [allPosts]);

  const getLatestLikedPost = useLatestPost(likedPosts);

  if (onLoadShimmer) {
    return (
      <div>
        <PageShimmer />
      </div>
    );
  }

  if (likedPosts?.length === 0) {
    return <div className="no-liked-post">No Liked Posts Yet!</div>;
  }
  return (
    <div className="liked-post">
      {getLatestLikedPost?.map((post) => (
        <div key={post._id}>{<ShowPost post={post} />}</div>
      ))}
    </div>
  );
};

export default LikedPost;
