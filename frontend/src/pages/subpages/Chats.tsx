import ChatSidebar from "@/components/chats/ChatSidebar";
import ChatWindowWrapper from "@/components/chats/ChatWindow_wrapper";
import { Card, CardContent } from "@/components/ui/card";

export const ChatsPage = () => {
  return (
    <Card className="flex flex-col flex-1">
      <CardContent className="pb-0 flex flex-col flex-1">
        <div className="flex-1 flex overflow-hidden">
          <ChatSidebar />
          <ChatWindowWrapper />
        </div>
      </CardContent>
    </Card>
  );
};
