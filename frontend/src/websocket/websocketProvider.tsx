import { useAppSelector } from "@/statemanagement/store";
import { useEffect } from "react";

export const useWebsocket = (
  url: string,
  listenToEvents: { eventName: string; onEvent: (data: unknown) => void }[]
) => {
  const token = useAppSelector((state) => state.authentication.token) || "";

  useEffect(() => {
    websocketInitializer(url, token, listenToEvents);
  }, [url, token]);
};

const websocketInitializer = (
  url: string,
  token: string,
  listenToEvents: { eventName: string; onEvent: (data: unknown) => void }[]
) => {
  const initWebsocket = () => {
    const ws = new WebSocket(url);
    let isReconnecting = false;
    ws.onmessage = (event) => {
      listenToEvents.forEach((listenDef) => {
        if (listenDef.eventName === "default") {
          //todo add event name to the event
          listenDef.onEvent(JSON.parse(event.data));
        }
      });
    };
    ws.onopen = () => {
      ws.send(JSON.stringify({ token: token, data: "" }));
    };
    const reconnect = () => {
      if (!isReconnecting) {
        isReconnecting = true;
        setTimeout(() => {
          initWebsocket();
        }, 500);
      }
    };
    ws.onclose = () => {
      reconnect();
    };
    ws.onerror = () => {
      reconnect();
    };
  };
  initWebsocket();
};
