import { CreatePostWrapper } from "../../components/posts/createpost_wrapper";
import { PostList } from "../../components/posts/postlist";
import { UserPanel } from "../../components/users/usersPanel";

export function MainPage() {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-2/3 space-y-6">
        <CreatePostWrapper />
        <PostList />
      </div>
      <UserPanel />
    </div>
  );
}
