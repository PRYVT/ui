import { ContentCard } from "./contentcard/contentcard";
import { CreatePostWrapper } from "./posts/createpost_wrapper";
import { UserPanel } from "./users/usersPanel";

export function SocialNetworkLayout() {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-2/3 space-y-6">
        <CreatePostWrapper />
        {[1, 2, 3].map((post) => (
          <ContentCard id={post} />
        ))}
      </div>
      <UserPanel />
    </div>
  );
}
