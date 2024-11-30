import { Post } from "@/types/post.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { v4 as uuidv4 } from "uuid";
export interface PostState {
  posts: Post[];
  postsLoading: boolean;
  postSending: boolean;
}

const initialState: PostState = {
  posts: [],
  postsLoading: false,
  postSending: false,
};

export const getAllPosts = createAsyncThunk("posts/getAll", async () => {
  let token = window.sessionStorage.getItem("token");

  const response = await fetch(
    "https://" + window.envUrl + "/api/v1/posting/query/posts/",
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

export const addPost = createAsyncThunk(
  "posts/add",
  async (payload: { text?: string; imageBase64?: string }) => {
    let token = window.sessionStorage.getItem("token");
    const tokenDec = jwtDecode(token!);
    const post = {
      id: uuidv4(),
      text: payload.text,
      image_base64: payload.imageBase64,
      user_id: tokenDec.sub,
      change_date: new Date().toISOString(),
    } as Post;
    const response = await fetch(
      "https://" + window.envUrl + "/api/v1/posting/command/posts/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(post),
        method: "POST",
      }
    );
    if (response.status > 299) {
      throw new Error("Request failed with " + response.status);
    }
    return post;
  }
);

export const usersSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.pending, (state) => {
      state.postsLoading = true;
    });
    builder.addCase(getAllPosts.rejected, (state) => {
      state.postsLoading = false;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.postsLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(addPost.pending, (state) => {
      state.postSending = true;
    });
    builder.addCase(addPost.rejected, (state, err) => {
      state.postSending = false;
      console.log(err);
    });
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.postSending = false;
      state.posts.unshift(action.payload);
    });
  },
});

export default usersSlice.reducer;
