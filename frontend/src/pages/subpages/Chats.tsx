import ChatSidebar from "@/components/chats/ChatSidebar";
import ChatWindow from "@/components/chats/ChatWindow";
import { Card, CardContent } from "@/components/ui/card";

export const ChatsPage = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex-1 flex overflow-hidden">
          <ChatSidebar />
          <ChatWindow />
        </div>
      </CardContent>
    </Card>
  );
};
