import ShowPost from "../../components/ShowPosts/ShowPost";
import useGetAllPosts from "../../utils/CustomHook/useGetAllPosts";

import "./Explore.css";

const Explore = () => {
  const allPosts = useGetAllPosts();

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
