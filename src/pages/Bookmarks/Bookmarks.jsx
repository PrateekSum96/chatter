import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ShowPost from "../../components/ShowPosts/ShowPost";
import { getBookmarkedPost } from "../../features/bookmarkSlice";
import PageShimmer from "../../components/Shimmer/PageShimmer/PageShimmer";
import { getLatestPost } from "../../utils/utilityFunction/getLatestPost";
import "./Bookmarks.css";

const Bookmarks = () => {
  const dispatch = useDispatch();
  const [onLoadShimmer, setOnLoadShimmer] = useState(true);
  const bookmarkedPosts = useSelector(
    (store) => store.appBookmarks.bookmarkedPost
  );
  const showShimmer = useSelector((store) => store.appBookmarks.showShimmer);
  const allPosts = useSelector((store) => store.appPosts.allPosts);

  useEffect(() => {
    dispatch(getBookmarkedPost());
    setOnLoadShimmer(false);
    // eslint-disable-next-line
  }, []);

  const postsInBookmarks = allPosts?.filter((post) => {
    return bookmarkedPosts.some((bkPost) => bkPost._id === post._id);
  });
  //show latest post
  const getLatestBookmarkPost = getLatestPost(postsInBookmarks);

  if (showShimmer || onLoadShimmer) {
    return (
      <div>
        <PageShimmer />
      </div>
    );
  }

  return (
    <div className="bookmarks">
      {bookmarkedPosts?.length === 0 ? (
        <div className="no-bookmarks">No Bookmarks Yet!</div>
      ) : (
        getLatestBookmarkPost?.map((post) => (
          <div key={post._id}>{<ShowPost post={post} />}</div>
        ))
      )}
    </div>
  );
};

export default Bookmarks;
