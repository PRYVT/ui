import { useAppDispatch, useAppSelector } from "@/statemanagement/store";
import { getAllUsers } from "@/statemanagement/users/usersSlice";
import { useEffect } from "react";
import { SidePanel } from "../SidePanel/SidePanel";

export const UserPanel = () => {
  const userState = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <>
      <SidePanel isLoading={userState.usersLoading} users={userState.users} />
    </>
  );
};
