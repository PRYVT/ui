import { FullUser } from "@/types/fullUser.type";
import { User } from "@/types/user.type";
import { SkeletonSuggestedUser } from "../suggesteduser/SkeletonSuggestedUser";
import { SuggestedUser } from "../suggesteduser/SuggestedUser";
import { SkeletonUserProfileEdit } from "../UserProfileEdit/SkeletonUserProfileEdit";
import { UserProfileEditPanel } from "../UserProfileEdit/UserProfileEdit";

export const SidePanel = ({
  usersLoading,
  users,
  ownUser,
  ownUserLoading,
}: {
  usersLoading: boolean;
  users: User[];
  ownUser: FullUser | null;
  ownUserLoading: boolean;
}) => {
  return (
    <div className="md:w-1/3 space-y-6">
      {ownUserLoading && <SkeletonUserProfileEdit />}
      {!ownUserLoading && ownUser && <UserProfileEditPanel user={ownUser} />}
      <div className="rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Suggested Connections</h2>
        <ul className="space-y-4">
          {!usersLoading && users.map((user) => <SuggestedUser user={user} />)}
          {usersLoading && [1, 2, 3].map(() => <SkeletonSuggestedUser />)}
        </ul>
      </div>
    </div>
  );
};
