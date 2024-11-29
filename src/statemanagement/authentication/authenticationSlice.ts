import { LoginRequest } from "@/types/login.type";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface AuthenticationState {
  token: string | null;
  isAuthenticated: boolean | null;
  loginError: boolean | null;
}

const initialState: AuthenticationState = {
  token: null,
  isAuthenticated: null,
  loginError: null,
};

export const fetchToken = createAsyncThunk(
  "authentication/fetchToken",
  async () => {
    let token = window.sessionStorage.getItem("token");
    if (token) {
      const response = await fetch(
        "https://" +
          window.envUrl +
          "/api/v1/identification/query/authentication/refresh",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
        }
      );
      if (response.status > 299) {
        throw new Error("Request failed with " + response.status);
      }
      const data = await response.json();
      token = data.token;
      window.sessionStorage.setItem("token", token!);
      return token;
    } else {
      throw new Error("No token found in session storage");
    }
  }
);

export const login = createAsyncThunk(
  "authentication/login",
  async ({ username, password }: LoginRequest) => {
    const response = await fetch(
      "https://" +
        window.envUrl +
        "/api/v1/identification/query/authentication/token",
      {
        method: "POST",

        body: JSON.stringify({
          username,
          password,
        }),
      }
    );
    if (response.status > 299) {
      throw new Error("Request failed with " + response.status);
    }
    const data = await response.json();
    const token = data.token;
    window.sessionStorage.setItem("token", token!);
    return token;
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
      state.isAuthenticated = true;
    });
    builder.addCase(login.rejected, (state) => {
      state.token = null;
      state.loginError = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload;
      state.loginError = null;
      state.isAuthenticated = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setToken } = counterSlice.actions;

export default counterSlice.reducer;
