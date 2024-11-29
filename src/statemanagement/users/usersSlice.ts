import { User } from "@/types/user.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface UsersState {
  users: User[];
  usersLoading: boolean;
}

const initialState: UsersState = {
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
      state.users = action.payload;
    });
  },
});

export default usersSlice.reducer;
