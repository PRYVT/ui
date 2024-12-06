import { ChatMessage } from "@/types/chatmessage.type";
import { unique } from "./unique_array";

export const createUniqueMessages = (
  oldMessages?: ChatMessage[],
  newMessages?: ChatMessage[]
) => {
  const messages = unique(
    [...(oldMessages ?? []), ...(newMessages ?? [])],
    (x) => x.id
  );
  const noNewMessages = messages.length - (oldMessages?.length ?? 0);
  return { messages, noNewMessages };
};
