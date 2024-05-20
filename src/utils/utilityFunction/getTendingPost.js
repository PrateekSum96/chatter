export const getTrendingPost = (postList) => {
  const posts = [...postList];
  const trendingPost = posts?.sort(
    (a, b) => b.likes.likeCount - a.likes.likeCount
  );
  return trendingPost;
};
