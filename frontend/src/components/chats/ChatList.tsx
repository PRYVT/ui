import { useAppSelector } from "@/statemanagement/store";
import ChatRooms from "./ChatItem";

export default function ChatList() {
  const chats = useAppSelector((state) => {
    const chats = state.chats.chats;
    return chats.map((chat) => {
      return {
        id: chat.id,
        name: chat.name,
        lastMessage: "",
        avatar: {
          fallbackColorGen: chat.id,
        },
        timestamp: "",
        unread: 0,
      };
    });
  });
  return (
    <div>
      {chats.map((chat) => (
        <ChatRooms key={chat.id} {...chat} />
      ))}
    </div>
  );
}
