import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  chooseTwoCharsFromName,
  randomTailwindBackgroundColor,
} from "@/lib/utils";
import { useAppSelector } from "@/statemanagement/store";
import { AvatarImage } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Bell, Home, Mail, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { ModeToggle } from "../theming/themetoggle";
import { Card, CardContent, CardHeader } from "../ui/card";
export const Header = () => {
  const user = useAppSelector((state) => state.users.ownUser);
  const notificate = useAppSelector(
    (state) =>
      state.chats.chats?.filter((chat) => chat.unreadMessages ?? 0 > 0).length >
      0
  );
  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            PRYVT
          </h1>
          <nav className="hidden md:flex space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            <Button variant="ghost" size="sm" disabled>
              <Users className="h-4 w-4 mr-2" />
              Network
            </Button>
            <Link to="/chats">
              <Button variant="ghost" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Messages
              </Button>
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <form className="hidden md:block">
            <Input type="search" placeholder="Search..." className="w-64" />
          </form>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                disabled={!notificate}
              >
                <Bell className="h-5 w-5" />
                {notificate && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-80"
              align="end"
              side="bottom"
              alignOffset={-15}
              sideOffset={10}
            >
              <Card className="select-none">
                <CardHeader>
                  <h3 className="font-medium leading-none">Notifications</h3>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <div className="flex items-start gap-4 rounded-lg p-2 hover:bg-gray-100">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src="/placeholder-avatar.jpg"
                            alt="Avatar"
                          />
                          <AvatarFallback>SY</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                          <p className="text-sm font-medium leading-none">
                            System Info
                          </p>
                          <p className="text-sm text-gray-500">
                            New messages !
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </PopoverContent>
          </Popover>
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
