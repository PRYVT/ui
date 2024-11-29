import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface AuthenticationState {
  token: string | null;
  isAuthenticated: boolean | null;
}

const initialState: AuthenticationState = {
  token: null,
  isAuthenticated: null,
};

export const fetchToken = createAsyncThunk(
  "authentication/fetchToken",
  async () => {
    let token = window.sessionStorage.getItem("token");
    if (token) {
      const response = await fetch(
        "https://" +
          //@ts-ignore
          window.envUrl +
          "/api/v1/identification/query/authentication/refresh",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
        }
      );
      const data = await response.json();
      token = data.token;
      window.sessionStorage.setItem("token", token!);
      return token;
    } else {
      throw new Error("No token found in session storage");
    }
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchToken.rejected, (state) => {
      state.token = null;
      state.isAuthenticated = false;
    });
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      state.token = action.payload;
      // jwt token validation todo
      state.isAuthenticated = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setToken } = counterSlice.actions;

export default counterSlice.reducer;
