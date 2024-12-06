import { getChatById } from "@/statemanagement/chats/chatSlice";
import { useAppDispatch, useAppSelector } from "@/statemanagement/store";
import { useCallback } from "react";
import ChatRooms from "./ChatItem";

export default function ChatList() {
  const dispatch = useAppDispatch();
  const setChatId = useCallback(
    (chatId: string) => {
      dispatch(getChatById({ chatId }));
    },
    [dispatch]
  );
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
        unread: chat.unreadMessages ?? 0,
      };
    });
  });
  return (
    <div>
      {chats.map((chat) => (
        <ChatRooms key={chat.id} {...chat} onClick={setChatId} />
      ))}
    </div>
  );
}
