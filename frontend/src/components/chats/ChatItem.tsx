import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  chooseTwoCharsFromName,
  randomTailwindBackgroundColor,
} from "@/lib/utils";

interface ChatItemProps {
  name: string;
  lastMessage: string;
  avatar: {
    image?: string;
    fallbackColorGen: string;
  };
  timestamp: string;
  unread: number;
}

export default function ChatRooms({
  name,
  lastMessage,
  avatar,
  timestamp,
  unread,
}: ChatItemProps) {
  return (
    <div className="flex items-center space-x-4 p-4 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer">
      <Avatar>
        {avatar.image && <AvatarImage src={avatar.image} alt={name} />}
        <AvatarFallback
          className={
            "text-white font-semibold " +
            randomTailwindBackgroundColor(avatar.fallbackColorGen)
          }
        >
          {chooseTwoCharsFromName(name)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
            {name}
          </h3>
          <p className="text-xs text-gray-500 truncate">{timestamp}</p>
        </div>
        <p className="text-sm text-gray-500 truncate">{lastMessage}</p>
      </div>
      {unread > 0 && (
        <Badge
          className="rounded-full px-2 py-1"
          style={{ width: 23, height: 23 }}
        >
          {unread}
        </Badge>
      )}
    </div>
  );
}
