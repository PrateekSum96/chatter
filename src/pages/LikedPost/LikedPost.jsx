import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./LikedPost.css";
import ShowPost from "../../components/ShowPosts/ShowPost";

const LikedPost = () => {
  const [likedPosts, setLikedPosts] = useState([]);
  const userLoggedIn = useSelector((store) => store.auth.user);
  const allPosts = useSelector((store) => store.appPosts.allPosts);

  useEffect(() => {
    const posts = allPosts?.filter((post) =>
      post.likes.likedBy.find((user) => user._id === userLoggedIn._id)
    );
    setLikedPosts(posts);
    // eslint-disable-next-line
  }, [allPosts]);

  if (likedPosts?.length === 0) {
    return <div className="no-liked-post">No Liked Posts Yet!</div>;
  }
  return (
    <div className="liked-post">
      {likedPosts?.map((post) => (
        <div key={post._id}>{<ShowPost post={post} />}</div>
      ))}
    </div>
  );
};

export default LikedPost;
