import { useAppSelector } from "@/statemanagement/store";
import ChatWindow from "./ChatWindow";

export default function ChatWindowWrapper() {
  const chatMessages = useAppSelector((state) => {
    const ownUser = state.users.ownUser;
    const chats = state.chats.chats;
    const chat = chats.find((chat) => chat.id === state.chats.activeChatId);
    return (
      chat?.messages?.map((message) => {
        return {
          id: message.id,
          content: message.text,
          ownMessage: message.user_id === ownUser?.id,
          timestamp: "",
        };
      }) ?? null
    );
  });
  return <ChatWindow messages={chatMessages ?? []} />;
}
