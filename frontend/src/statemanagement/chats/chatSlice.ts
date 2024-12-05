import { ChatRoom } from "@/types/chatroom.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export interface ChatState {
  chats: ChatRoom[];
  chatsLoading: boolean;
  messageSending: boolean;
  activeChatId?: string;
}

const initialState: ChatState = {
  chats: [],
  chatsLoading: false,
  messageSending: false,
};

export const getAllChats = createAsyncThunk("chats/getAll", async () => {
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
  const data = await response.json();
  console.log(data);
  return data;
});

export const addMessage = createAsyncThunk(
  "chats/add",
  async (payload: { text?: string; imageBase64?: string }) => {
    /*let token = window.sessionStorage.getItem("token");
    const tokenDec = jwtDecode(token!);
    const chat = {
      id: uuidv4(),
      text: payload.text,
      image_base64: payload.imageBase64,
      user_id: tokenDec.sub,
      change_date: new Date().toISOString(),
    } as ChatRoom;
    const response = await fetch(
      "https://" + window.envUrl + "/api/v1/chats/command/chats/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(chat),
        method: "Chat",
      }
    );
    if (response.status > 299) {
      throw new Error("Request failed with " + response.status);
    }
    return chat;*/
  }
);

export const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addChatSync: (state, action) => {
      state.chats.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllChats.pending, (state) => {
      state.chatsLoading = true;
    });
    builder.addCase(getAllChats.rejected, (state) => {
      state.chatsLoading = false;
    });
    builder.addCase(getAllChats.fulfilled, (state, action) => {
      state.chatsLoading = false;
      state.chats = action.payload;
    });
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

export const { addChatSync } = chatSlice.actions;

export default chatSlice.reducer;
