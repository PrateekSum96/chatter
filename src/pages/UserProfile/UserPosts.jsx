import { useSelector } from "react-redux";
import ShowPost from "../../components/ShowPosts/ShowPost";
import { useLatestPost } from "../../utils/CustomHooks/useLatestPost";

const UserPost = () => {
  const allUserPosts = useSelector((store) => store.appUsers.allPostsUser);

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
