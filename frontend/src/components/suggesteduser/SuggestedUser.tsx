import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  chooseTwoCharsFromName,
  randomTailwindBackgroundColor,
} from "@/lib/utils";
import { User } from "@/types/user.type";
export const SuggestedUser = ({ user }: { user: User }) => {
  return (
    <li key={user.display_name} className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarFallback
            className={
              "text-white font-semibold " +
              randomTailwindBackgroundColor(user.id)
            }
          >
            {chooseTwoCharsFromName(user.display_name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{user.display_name}</h3>
          <p className="text-sm text-gray-500">{user.id}</p>
        </div>
      </div>
      <Button size="sm">Add Friend</Button>
    </li>
  );
};
