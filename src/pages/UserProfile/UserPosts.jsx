import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostsOfAUser } from "../../features/userSlice";
import ShowPost from "../../components/ShowPosts/ShowPost";
import { useLatestPost } from "../../utils/CustomHooks/useLatestPost";

const UserPost = ({ username }) => {
  const dispatch = useDispatch();
  const allUserPosts = useSelector((store) => store.appUsers.allPostsUser);
  useEffect(() => {
    dispatch(getAllPostsOfAUser(username));
    // eslint-disable-next-line
  }, [username]);

  const latestPost = useLatestPost(allUserPosts);

  if (allUserPosts.length === 0) {
    return <div className="no-post-home">No Post Yet!</div>;
  }
  return (
    <div>
      {latestPost?.map((post) => (
        <div key={post._id}>
          <ShowPost post={post} />
        </div>
      ))}
    </div>
  );
};

export default UserPost;
