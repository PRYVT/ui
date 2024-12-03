import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";

interface Message {
  id: number;
  content: string;
  sender: "user" | "other";
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    content: "Hey there! How's it going?",
    sender: "other",
    timestamp: "10:00 AM",
  },
  {
    id: 2,
    content: "Hi! I'm doing well, thanks. How about you?",
    sender: "user",
    timestamp: "10:02 AM",
  },
  {
    id: 3,
    content: "I'm great! Just working on some new features for our app.",
    sender: "other",
    timestamp: "10:05 AM",
  },
  {
    id: 4,
    content: "That sounds exciting! Can't wait to see what you come up with.",
    sender: "user",
    timestamp: "10:07 AM",
  },
];

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        content: newMessage,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b border-gray-200 dark:border-slate-800 p-4 flex items-center space-x-4">
        <Avatar>
          <AvatarImage
            src="/placeholder.svg?height=40&width=40"
            alt="Alice Johnson"
          />
          <AvatarFallback>AJ</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-black dark:text-white text-lg font-semibold">
            Alice Johnson
          </h2>
          <p className="text-sm text-gray-500">Online</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-2 rounded-lg ${
                message.sender === "user"
                  ? "bg-slate-800 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <p>{message.content}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === "user" ? "text-blue-100" : "text-gray-500"
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
