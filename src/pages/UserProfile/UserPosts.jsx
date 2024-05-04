import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostsOfAUser } from "../../features/userSlice";
import ShowPost from "../../components/ShowPosts/ShowPost";

const UserPost = ({ username }) => {
  const dispatch = useDispatch();
  const allUserPosts = useSelector((store) => store.appUsers.allPostsUser);
  useEffect(() => {
    dispatch(getAllPostsOfAUser(username));
    // eslint-disable-next-line
  }, [username]);
  return (
    <div>
      {allUserPosts?.map((post) => (
        <div key={post._id}>
          <ShowPost post={post} />
        </div>
      ))}
    </div>
  );
};

export default UserPost;
