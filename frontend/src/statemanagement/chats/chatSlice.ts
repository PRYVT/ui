import { ChatMessage } from "@/types/chatmessage.type";
import { ChatRoom, ChatRoomWithNotifications } from "@/types/chatroom.type";
import { createUniqueMessages } from "@/utils/unreadMessages";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export interface ChatState {
  chats: ChatRoomWithNotifications[];
  chatsAreLoading: boolean;
  chatIsLoading: boolean;
  messageSending: boolean;
  activeChatId?: string;
}

const initialState: ChatState = {
  chats: [],
  chatsAreLoading: false,
  chatIsLoading: false,
  messageSending: false,
};

const setMessagesForChat = (
  chat: ChatRoomWithNotifications,
  activeChatId?: string,
  messagesToAdd?: ChatMessage[]
) => {
  const { messages, noNewMessages } = createUniqueMessages(
    chat.messages,
    messagesToAdd
  );
  chat.messages = messages;
  chat.unreadMessages = noNewMessages;
};

export const getAllChats = createAsyncThunk("chats/getAll", async (_, s) => {
  let token = window.sessionStorage.getItem("token");
  const response = await fetch(
    "https://" + window.envUrl + "/api/v1/chats/query/chats/",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.status > 299) {
    throw new Error("Request failed with " + response.status);
  }
  const data = (await response.json()) as ChatRoomWithNotifications[];
  data.forEach((chat) => {
    chat.unreadMessages = 0;
  });
  if (data.length > 0) {
    s.dispatch(getChatById({ chatId: data[0].id }));
  }

  return data;
});

export const getChatById = createAsyncThunk(
  "chats/getById",
  async ({ chatId }: { chatId: string }, t) => {
    console.log(chatId);
    let token = window.sessionStorage.getItem("token");

    const activeChatId = (t.getState() as { chats: ChatState }).chats
      .activeChatId;
    if (activeChatId == chatId) {
      return { messages: [], chatId };
    }
    t.dispatch(setActiveChatId(chatId));

    const response = await fetch(
      "https://" + window.envUrl + `/api/v1/chats/query/chats/${chatId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status > 299) {
      throw new Error("Request failed with " + response.status);
    }
    const data = await response.json();
    console.log(data);

    return { messages: data.messages, chatId };
  }
);

export const addMessage = createAsyncThunk(
  "chats/add",
  async (payload: { text?: string; imageBase64?: string }, t) => {
    let token = window.sessionStorage.getItem("token");
    const activeChatId = (t.getState() as { chats: ChatState }).chats
      .activeChatId;
    const chat = {
      text: payload.text,
    };
    const response = await fetch(
      "https://" +
        window.envUrl +
        `/api/v1/chats/command/chats/${activeChatId}/message`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(chat),
        method: "POST",
      }
    );
    if (response.status > 299) {
      throw new Error("Request failed with " + response.status);
    }
    return chat;
  }
);

export const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setActiveChatId: (state, action: { payload: string }) => {
      state.activeChatId = action.payload;
    },
    setReadMessages: (state) => {
      const chat = state.chats.find((x) => x.id == state.activeChatId);
      if (chat != null) {
        chat.unreadMessages = 0;
      }
    },
    updateChatRoomMessagesSync: (state, action: { payload: ChatRoom }) => {
      const chatRoom = state.chats.find((x) => x.id == action.payload.id);
      if (chatRoom != null) {
        setMessagesForChat(
          chatRoom,
          state.activeChatId,
          action.payload.messages
        );
      } else {
        state.chats.push({ ...action.payload, unreadMessages: 1 });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllChats.pending, (state) => {
      state.chatsAreLoading = true;
    });
    builder.addCase(getAllChats.rejected, (state) => {
      state.chatsAreLoading = false;
    });
    builder.addCase(getAllChats.fulfilled, (state, action) => {
      state.chatsAreLoading = false;
      state.chats = action.payload;
    });
    builder.addCase(getChatById.pending, (state) => {
      state.chatIsLoading = true;
    });
    builder.addCase(getChatById.rejected, (state) => {
      state.chatIsLoading = false;
    });
    builder.addCase(
      getChatById.fulfilled,
      (
        state,
        action: { payload: { chatId: string; messages: ChatMessage[] } }
      ) => {
        state.chatIsLoading = false;
        const chat = state.chats.find((x) => x.id == action.payload.chatId);
        if (chat != null) {
          setMessagesForChat(chat, state.activeChatId, action.payload.messages);
        }
      }
    );
    builder.addCase(addMessage.pending, (state) => {
      state.messageSending = true;
    });
    builder.addCase(addMessage.rejected, (state, err) => {
      state.messageSending = false;
      console.log(err);
    });
    builder.addCase(addMessage.fulfilled, (state) => {
      state.messageSending = false;
    });
  },
});

export const { updateChatRoomMessagesSync, setActiveChatId, setReadMessages } =
  chatSlice.actions;

export default chatSlice.reducer;
