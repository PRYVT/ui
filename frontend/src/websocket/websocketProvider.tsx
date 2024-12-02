import { addPostSync } from "@/statemanagement/posting/postSlice";
import { useAppDispatch, useAppSelector } from "@/statemanagement/store";
import { useCallback, useEffect, useMemo, useState } from "react";

interface WebsocketProviderProps {
  children: React.ReactNode;
}

export const WebsocketProvider = ({ children }: WebsocketProviderProps) => {
  const url = `ws://${window.envUrl}/api/v1/posting/query/ws`;
  const token = useAppSelector((state) => state.authentication.token);
  const dispatch = useAppDispatch();
  const [newWebSocket, setNewWebSocket] = useState(0);
  const ws = useMemo(() => {
    return new WebSocket(url);
  }, [newWebSocket]);

  const onPost = useCallback(
    (data: any) => {
      console.log(data);
      dispatch(addPostSync(data));
    },
    [ws, dispatch]
  );
  useEffect(() => {
    ws.onmessage = (event) => {
      onPost(JSON.parse(event.data));
    };
    ws.onopen = () => {
      ws.send(JSON.stringify({ token: token, data: "" }));
    };
    ws.onclose = () => {
      setTimeout(() => {
        setNewWebSocket(newWebSocket + 1);
      }, 500);
    };
    ws.onerror = () => {
      setTimeout(() => {
        setNewWebSocket(newWebSocket + 1);
      }, 500);
    };
  }, [ws, newWebSocket, onPost]);

  return <>{children}</>;
};
