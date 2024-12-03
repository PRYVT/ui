import ChatItem from "./ChatItem";

const chats = [
  {
    id: 1,
    name: "Alice Johnsonn",
    lastMessage: "Hey, how are you doing?",
    avatar: {
      image: "/placeholder.svg?height=40&width=40",
      fallbackColorGen: "Alice Johnsonn",
    },
    timestamp: "5m ago",
    unread: 2,
  },
  {
    id: 2,
    name: "Bob Smith",
    lastMessage: "Did you see the latest post?",
    avatar: {
      image: "/placeholder.svg?height=40&width=40",
      fallbackColorGen: "Bob Smith",
    },
    timestamp: "1h ago",
    unread: 0,
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
