import { useSelector } from "react-redux";
import ShowPost from "../../components/ShowPosts/ShowPost";

import "./Bookmarks.css";

const Bookmarks = () => {
  const bookmarkedPosts = useSelector(
    (store) => store.appBookmarks.bookmarkedPost
  );
  const allPosts = useSelector((store) => store.appPosts.allPosts);

  const postsInBookmarks = allPosts?.filter((post) => {
    return bookmarkedPosts.some((bkPost) => bkPost._id === post._id);
  });

  if (bookmarkedPosts?.length === 0) {
    return <div className="no-bookmarks">No Bookmarks Yet!</div>;
  }

  return (
    <div className="bookmarks">
      {postsInBookmarks?.map((post) => (
        <div key={post._id}>{<ShowPost post={post} />}</div>
      ))}
    </div>
  );
};

export default Bookmarks;
