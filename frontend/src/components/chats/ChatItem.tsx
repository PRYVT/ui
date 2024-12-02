import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ChatItemProps {
  name: string;
  lastMessage: string;
  avatar: string;
  timestamp: string;
  unread: number;
}

export default function ChatItem({
  name,
  lastMessage,
  avatar,
  timestamp,
  unread,
}: ChatItemProps) {
  return (
    <div className="flex items-center space-x-4 p-4 hover:bg-gray-100 cursor-pointer">
      <Avatar>
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-sm font-medium text-gray-900 truncate">{name}</h3>
          <p className="text-xs text-gray-500">{timestamp}</p>
        </div>
        <p className="text-sm text-gray-500 truncate">{lastMessage}</p>
      </div>
      {unread > 0 && (
        <Badge variant="destructive" className="rounded-full px-2 py-1">
          {unread}
        </Badge>
      )}
    </div>
  );
}
