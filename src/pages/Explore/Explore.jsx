import { useSelector } from "react-redux";
import ShowPost from "../../components/ShowPosts/ShowPost";

import "./Explore.css";
import { useLatestPost } from "../../utils/CustomHooks/useLatestPost";

const Explore = () => {
  const allPosts = useSelector((store) => store.appPosts.allPosts);

  const getLatestPost = useLatestPost(allPosts);
  return (
    <div className="explore">
      {getLatestPost?.map((post) => (
        <div key={post._id}>
          <ShowPost post={post} />
        </div>
      ))}
    </div>
  );
};

export default Explore;
