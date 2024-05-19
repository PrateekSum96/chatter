import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAPost } from "../../features/postSlice";
import ShowPost from "../../components/ShowPosts/ShowPost";
import "./PostPage.css";
import SinglePostShimmer from "../../components/Shimmer/SinglePostShimmer/SinglePostShimmer";

const PostPage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((store) => store.appPosts.post);
  const allPosts = useSelector((store) => store.appPosts.allPosts);

  useEffect(() => {
    dispatch(getAPost(postId));
    // eslint-disable-next-line
  }, [allPosts]);

  // conditional rendering - shimmer

  if (postId !== post?._id) {
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
