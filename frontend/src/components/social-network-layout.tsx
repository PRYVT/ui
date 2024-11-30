import { CreatePostWrapper } from "./posts/createpost_wrapper";
import { PostList } from "./posts/postlist";
import { UserPanel } from "./users/usersPanel";

export function SocialNetworkLayout() {
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
