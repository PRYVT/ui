import {
  getChatById,
  setActiveChatId,
} from "@/statemanagement/chats/chatSlice";
import { useAppDispatch } from "@/statemanagement/store";
import { useCallback } from "react";
import ChatList from "./ChatList";

export default function ChatSidebar() {
  const dispatch = useAppDispatch();
  const setChatId = useCallback(
    (chatId: string) => {
      dispatch(setActiveChatId(chatId));
      dispatch(getChatById({ chatId }));
    },
    [dispatch]
  );
  return (
    <div className="w-full h-full md:w-1/3 lg:w-1/4  border-r border-gray-200 dark:border-slate-800 flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Chats</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ChatList setChatId={setChatId} />
      </div>
    </div>
  );
}
