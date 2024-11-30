import { getAllPosts } from "@/statemanagement/posting/postSlice";
import { useAppDispatch, useAppSelector } from "@/statemanagement/store";
import { EnhancedPost } from "@/types/enhanced_post.type";
import { useEffect } from "react";
import { ContentCard } from "./contentcard";

export const PostList = () => {
  const posts = useAppSelector((state) => {
    const posts = state.posts.posts;
    const enahncedPosts = posts.map((post) => {
      return {
        ...post,
        user: state.users.users.find((user) => user.id === post.user_id) ?? {
          display_name: "Unknown",
          id: "Unknown",
        },
      } as EnhancedPost;
    });
    return enahncedPosts;
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <>
      {posts.map((post) => (
        <ContentCard post={post} />
      ))}
    </>
  );
};
