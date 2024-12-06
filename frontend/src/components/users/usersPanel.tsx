import { useAppSelector } from "@/statemanagement/store";
import { SidePanel } from "../SidePanel/SidePanel";

export const UserPanel = () => {
  const userState = useAppSelector((state) => state.users);

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
