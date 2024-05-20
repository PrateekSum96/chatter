export const getLatestPost = (postList) => {
  const posts = [...postList];
  const latestPosts = posts?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return latestPosts;
};
