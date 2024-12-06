import { Header } from "@/components/header/header";
import { MainPage } from "@/pages/subpages/Main";
import { getAllChats } from "@/statemanagement/chats/chatSlice";
import { getAllPosts } from "@/statemanagement/posting/postSlice";
import { useAppDispatch } from "@/statemanagement/store";
import { getAllUsers, getOwnUser } from "@/statemanagement/users/usersSlice";
import { useChatWebsocket } from "@/websocket/chatWebsocket";
import { usePostWebsocket } from "@/websocket/postWebsocket";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ChatsPage } from "./subpages/Chats";

export const Main = () => {
  const dispatch = useAppDispatch();
  usePostWebsocket();
  useChatWebsocket();
  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getAllChats());
    dispatch(getOwnUser());
    dispatch(getAllUsers());
  }, []);

  return (
    <>
      <Header />
      <main className="flex-1 flex">
        <div className="container mx-auto shadow-lg rounded-lg p-6 flex flex-col">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="chats" element={<ChatsPage />} />
          </Routes>
        </div>
      </main>
    </>
  );
};
