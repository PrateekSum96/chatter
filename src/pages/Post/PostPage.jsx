import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAPost } from "../../features/postSlice";
import ShowPost from "../../components/ShowPosts/ShowPost";
import "./PostPage.css";
import SinglePostShimmer from "../../components/Shimmer/SinglePostShimmer/SinglePostShimmer";
import { getUserComments } from "../../features/commentSlice";
import ShowComment from "../../components/Comment/ShowComment";
import AddComment from "../../components/Comment/AddComment";
import { getLatestPost } from "../../utils/utilityFunction/getLatestPost";

const PostPage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((store) => store.appPosts.post);
  const allPosts = useSelector((store) => store.appPosts.allPosts);
  const comments = useSelector((store) => store.postComment.comments);
  const commentAllPosts = useSelector((store) => store.postComment.allPosts);

  useEffect(() => {
    dispatch(getAPost(postId));
    // eslint-disable-next-line
  }, [allPosts, comments]);

  useEffect(() => {
    dispatch(getUserComments({ postId }));
    // eslint-disable-next-line
  }, [commentAllPosts]);

  const latestComment = getLatestPost(comments);
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
      <div className="comment-container-pp">
        <AddComment postId={post?._id} />
        <div>
          {latestComment?.map((comment) => (
            <div key={comment._id} className="comment-pp">
              <ShowComment comment={comment} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
