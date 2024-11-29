import { User } from "@/types/user.type";
import { SkeletonSuggestedUser } from "../suggesteduser/SkeletonSuggestedUser";
import { SuggestedUser } from "../suggesteduser/SuggestedUser";
import { UserProfileEditPanel } from "../UserProfileEdit/UserProfileEdit";

export const SidePanel = ({
  isLoading,
  users,
}: {
  isLoading: boolean;
  users: User[];
}) => {
  return (
    <div className="md:w-1/3 space-y-6">
      <UserProfileEditPanel />
      <div className="rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Suggested Connections</h2>
        <ul className="space-y-4">
          {!isLoading && users.map((user) => <SuggestedUser user={user} />)}
          {isLoading && [1, 2, 3].map(() => <SkeletonSuggestedUser />)}
        </ul>
      </div>
    </div>
  );
};
