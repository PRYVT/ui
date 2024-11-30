import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authenticationReducer from "./authentication/authenticationSlice";
import postReducer from "./posting/postSlice";
import usersReducer from "./users/usersSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    users: usersReducer,
    posts: postReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
