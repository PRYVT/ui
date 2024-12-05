import { ChatMessage } from "./chatmessage.type";

export interface ChatRoom {
  id: string;
  name: string;
  messages?: ChatMessage[];
  isLoading?: boolean;
}
