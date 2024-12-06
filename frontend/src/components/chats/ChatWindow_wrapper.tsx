import { useAppSelector } from "@/statemanagement/store";
import ChatWindow from "./ChatWindow";

export default function ChatWindowWrapper() {
  const { withUser, chatMessages } = useAppSelector((state) => {
    const ownUser = state.users.ownUser;
    const chats = state.chats.chats;
    const chat = chats.find((chat) => chat.id === state.chats.activeChatId);
    let otherUserId = chat?.user_ids.find((user) => user !== ownUser?.id);
    let withUser = state.users.users.find((user) => user.id === otherUserId);
    console.log(state.users);
    return {
      withUser,
      chatMessages:
        chat?.messages?.map((message) => {
          return {
            id: message.id,
            content: message.text,
            ownMessage: message.user_id === ownUser?.id,
            timestamp: "",
          };
        }) ?? null,
    };
  });
  return (
    <ChatWindow
      withUser={withUser || { display_name: "", id: "" }}
      messages={chatMessages ?? []}
    />
  );
}
