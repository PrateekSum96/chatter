import { useSelector } from "react-redux";
import ShowPost from "../../components/ShowPosts/ShowPost";

import "./Explore.css";

const Explore = () => {
  const allPosts = useSelector((store) => store.appPosts.allPosts);
  return (
    <div className="explore">
      {allPosts?.map((post) => (
        <div key={post._id}>
          <ShowPost post={post} />
        </div>
      ))}
    </div>
  );
};

export default Explore;
