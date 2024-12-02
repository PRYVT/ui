import ChatItem from "./ChatItem";

const chats = [
  {
    id: 1,
    name: "Alice Johnson",
    lastMessage: "Hey, how are you doing?",
    avatar: "/placeholder.svg?height=40&width=40",
    timestamp: "5m ago",
    unread: 2,
  },
  {
    id: 2,
    name: "Bob Smith",
    lastMessage: "Did you see the latest post?",
    avatar: "/placeholder.svg?height=40&width=40",
    timestamp: "1h ago",
    unread: 0,
  },
  {
    id: 3,
    name: "Carol Williams",
    lastMessage: "Let's meet up this weekend!",
    avatar: "/placeholder.svg?height=40&width=40",
    timestamp: "2h ago",
    unread: 1,
  },
  // Add more chat items to make the list scrollable
  {
    id: 4,
    name: "David Brown",
    lastMessage: "Thanks for your help!",
    avatar: "/placeholder.svg?height=40&width=40",
    timestamp: "1d ago",
    unread: 0,
  },
  {
    id: 5,
    name: "Emma Davis",
    lastMessage: "Can you send me the files?",
    avatar: "/placeholder.svg?height=40&width=40",
    timestamp: "2d ago",
    unread: 3,
  },
];

export default function ChatList() {
  return (
    <div>
      {chats.map((chat) => (
        <ChatItem key={chat.id} {...chat} />
      ))}
    </div>
  );
}
