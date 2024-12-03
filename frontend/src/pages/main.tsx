import { Header } from "@/components/header/header";
import { MainPage } from "@/pages/subpages/Main";
import { WebsocketProvider } from "@/websocket/websocketProvider";
import { Route, Routes } from "react-router-dom";
import { ChatsPage } from "./subpages/Chats";

export const Main = () => {
  return (
    <WebsocketProvider>
      <Header />
      <main className="flex-1 flex">
        <div className="container mx-auto shadow-lg rounded-lg p-6 flex flex-col">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="chats" element={<ChatsPage />} />
          </Routes>
        </div>
      </main>
    </WebsocketProvider>
  );
};
