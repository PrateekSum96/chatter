import { useEffect, useState } from "react";

const useGetAllPosts = () => {
  const [allPosts, setAllPosts] = useState();

  const getAllPosts = async () => {
    try {
      const response = await fetch("/api/posts", {
        method: "GET",
      });
      const result = await response.json();
      // console.log(result);
      setAllPosts(result.posts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return allPosts;
};

export default useGetAllPosts;
