import { addPost } from "@/statemanagement/posting/postSlice";
import { useAppDispatch, useAppSelector } from "@/statemanagement/store";
import { useCallback } from "react";
import { CreatePost } from "./createpost";

export const CreatePostWrapper = () => {
  const dispatch = useAppDispatch();
  const postSending = useAppSelector((state) => state.posts.postSending);
  const upload = useCallback(
    (text?: string, imageBase64?: string) => {
      dispatch(addPost({ text: text, imageBase64: imageBase64 }));
    },
    [dispatch]
  );
  return (
    <>
      <CreatePost upload={upload} isLoading={postSending} />
    </>
  );
};
