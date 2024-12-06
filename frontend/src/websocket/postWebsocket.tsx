import { addPostSync } from "@/statemanagement/posting/postSlice";
import { useAppDispatch } from "@/statemanagement/store";
import { useCallback } from "react";
import { useWebsocket } from "./websocketProvider";

export const usePostWebsocket = () => {
  const dispatch = useAppDispatch();
  const onPost = useCallback(
    (data: any) => {
      console.log(data);
      dispatch(addPostSync(data));
    },
    [dispatch]
  );
  const url = `ws://${window.envUrl}/api/v1/posting/query/ws`;
  useWebsocket(url, [{ eventName: "default", onEvent: onPost }]);
};
