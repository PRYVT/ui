import { ChatMessage } from "./chatmessage.type";

export interface ChatRoom {
  id: string;
  name: string;
  user_ids: string[];
  messages?: ChatMessage[];
  isLoading?: boolean;
}
