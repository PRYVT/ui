import ChatList from "./ChatList";

export default function ChatSidebar() {
  return (
    <div className="w-full h-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Chats</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ChatList />
      </div>
    </div>
  );
}
