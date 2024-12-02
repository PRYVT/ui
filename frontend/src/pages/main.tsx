import { Header } from "@/components/header/header";
import { SocialNetworkLayout } from "@/components/social-network-layout";
import { WebsocketProvider } from "@/websocket/websocketProvider";

export const Main = () => {
  return (
    <WebsocketProvider>
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <SocialNetworkLayout />
        </div>
      </main>
    </WebsocketProvider>
  );
};
