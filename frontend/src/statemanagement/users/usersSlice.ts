import { FullUser } from "@/types/fullUser.type";
import { User } from "@/types/user.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

export interface UsersState {
  ownUser: FullUser | null;
  ownUserLoading: boolean;
  users: User[];
  usersLoading: boolean;
}

const initialState: UsersState = {
  ownUser: null,
  ownUserLoading: false,
  users: [],
  usersLoading: false,
};

export const getAllUsers = createAsyncThunk("users/getAll", async () => {
  let token = window.sessionStorage.getItem("token");

  const response = await fetch(
    "https://" + window.envUrl + "/api/v1/identification/query/users/",
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

export const getOwnUser = createAsyncThunk("users/getOwn", async () => {
  let token = window.sessionStorage.getItem("token");

  const decodedtoken = jwtDecode(token!);
  const userId = decodedtoken.sub;

  const response = await fetch(
    "https://" + window.envUrl + `/api/v1/identification/query/users/${userId}`,
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
  data.id = userId;
  return data;
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.usersLoading = true;
    });
    builder.addCase(getAllUsers.rejected, (state) => {
      state.usersLoading = false;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.usersLoading = false;
      let users = action.payload as User[];
      if (users) {
        users = users.filter((x) => x.id !== state.ownUser?.id);
      }
      state.users = users;
    });
    builder.addCase(getOwnUser.pending, (state) => {
      state.ownUserLoading = true;
    });
    builder.addCase(getOwnUser.rejected, (state) => {
      state.ownUserLoading = false;
    });
    builder.addCase(getOwnUser.fulfilled, (state, action) => {
      state.ownUserLoading = false;
      const user = action.payload;
      state.ownUser = user;
      state.users = state.users.filter((x) => x.id !== user.id);
    });
  },
});

export default usersSlice.reducer;
