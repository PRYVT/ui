import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  chooseTwoCharsFromName,
  randomTailwindBackgroundColor,
} from "@/lib/utils";
import { useAppSelector } from "@/statemanagement/store";
import { Bell, Home, Mail, Users } from "lucide-react";
import { ModeToggle } from "../theming/themetoggle";
export const Header = () => {
  const user = useAppSelector((state) => state.users.ownUser);
  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            PRYVT
          </h1>
          <nav className="hidden md:flex space-x-4">
            <Button variant="ghost" size="sm">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
            <Button variant="ghost" size="sm" disabled>
              <Users className="h-4 w-4 mr-2" />
              Network
            </Button>
            <Button variant="ghost" size="sm" disabled>
              <Mail className="h-4 w-4 mr-2" />
              Messages
            </Button>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <form className="hidden md:block">
            <Input type="search" placeholder="Search..." className="w-64" />
          </form>
          <Button variant="ghost" size="icon" disabled>
            <Bell className="h-5 w-5" />
          </Button>
          <Avatar>
            {user && (
              <AvatarFallback
                className={
                  "text-white font-semibold " +
                  randomTailwindBackgroundColor(user.id)
                }
              >
                {chooseTwoCharsFromName(user.display_name)}
              </AvatarFallback>
            )}
          </Avatar>
          <ModeToggle></ModeToggle>
        </div>
      </div>
    </header>
  );
};
