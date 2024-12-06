import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  chooseTwoCharsFromName,
  randomTailwindBackgroundColor,
} from "@/lib/utils";
import { User } from "@/types/user.type";
import { Send } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Message {
  id: string;
  content: string;
  ownMessage: boolean;
  timestamp: string;
}

export default function ChatWindow({
  withUser,
  messages,
}: {
  withUser: User;
  messages: Message[];
}) {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: uuidv4(),
        content: newMessage,
        ownMessage: true,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      console.log(message);
      setNewMessage("");
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b border-gray-200 dark:border-slate-800 p-4 flex items-center space-x-4">
        <Avatar>
          <AvatarFallback
            className={
              "text-white font-semibold " +
              randomTailwindBackgroundColor(withUser.id)
            }
          >
            {chooseTwoCharsFromName(withUser.display_name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-black dark:text-white text-lg font-semibold">
            {withUser.display_name}
          </h2>
          <p className="text-sm text-gray-500">Unkown Status</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.ownMessage ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-2 rounded-lg ${
                message.ownMessage
                  ? "bg-slate-800 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <p>{message.content}</p>
              <p
                className={`text-xs mt-1 ${
                  message.ownMessage ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 dark:border-slate-800 p-4">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
