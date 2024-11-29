import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  chooseTwoCharsFromName,
  randomTailwindBackgroundColor,
} from "@/lib/utils";
import { FullUser } from "@/types/fullUser.type";
import { User } from "lucide-react";
export const UserProfileEditPanel = ({ user }: { user: FullUser }) => {
  return (
    <div className="rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Your Profile</h2>
      <div className="flex items-center space-x-4 mb-4">
        <Avatar className="h-16 w-16">
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
      <Button className="w-full">
        <User className="h-4 w-4 mr-2" />
        Edit Profile
      </Button>
    </div>
  );
};
