import { CreatePost } from "./createpost";

export const CreatePostWrapper = () => {
  return (
    <>
      <CreatePost
        upload={() => {
          return new Promise(() => {});
        }}
      />
    </>
  );
};
