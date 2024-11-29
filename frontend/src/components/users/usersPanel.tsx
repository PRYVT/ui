import { useAppDispatch, useAppSelector } from "@/statemanagement/store";
import { getAllUsers, getOwnUser } from "@/statemanagement/users/usersSlice";
import { useEffect } from "react";
import { SidePanel } from "../SidePanel/SidePanel";

export const UserPanel = () => {
  const userState = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getOwnUser());
    dispatch(getAllUsers());
  }, []);

  return (
    <>
      <SidePanel
        usersLoading={userState.usersLoading}
        users={userState.users}
        ownUser={userState.ownUser}
        ownUserLoading={userState.ownUserLoading}
      />
    </>
  );
};
