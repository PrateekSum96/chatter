import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAPost } from "../../features/postSlice";
import ShowPost from "../../components/ShowPosts/ShowPost";
import "./PostPage.css";
import SinglePost from "../../components/Shimmer/SinglePost/SinglePost";

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

  if (status === "loading") {
    return (
      <div>
        <SinglePost />
      </div>
    );
  }

  return <div className="post-page">{<ShowPost post={post} />}</div>;
};

export default PostPage;
