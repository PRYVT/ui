import { updateChatRoomMessagesSync } from "@/statemanagement/chats/chatSlice";
import { useAppDispatch } from "@/statemanagement/store";
import { ChatRoom } from "@/types/chatroom.type";
import { useCallback } from "react";
import { useWebsocket } from "./websocketProvider";

export const useChatWebsocket = () => {
  const dispatch = useAppDispatch();
  const onChat = useCallback(
    (data: unknown) => {
      dispatch(updateChatRoomMessagesSync(data as ChatRoom));
    },
    [dispatch]
  );
  const url = `ws://${window.envUrl}/api/v1/chats/query/ws`;
  useWebsocket(url, [{ eventName: "default", onEvent: onChat }]);
};
