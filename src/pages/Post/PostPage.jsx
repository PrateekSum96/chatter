import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAPost } from "../../features/postSlice";
import ShowPost from "../../components/ShowPosts/ShowPost";
import "./PostPage.css";
import SinglePostShimmer from "../../components/Shimmer/SinglePost/SinglePostShimmer";

const PostPage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((store) => store.appPosts.post);
  const allPosts = useSelector((store) => store.appPosts.allPosts);
  const status = useSelector((store) => store.appPosts.status);

  useEffect(() => {
    dispatch(getAPost(postId));
    // eslint-disable-next-line
  }, [allPosts]);

  // conditional rendering - shimmer
  if (status === "loading") {
    return (
      <div>
        <SinglePostShimmer />
      </div>
    );
  }

  return (
    <div className="post-page">
      <ShowPost post={post} />
    </div>
  );
};

export default PostPage;
