import { Header } from "@/components/header/header";
import { SocialNetworkLayout } from "@/components/social-network-layout";

export const Main = () => {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <SocialNetworkLayout />
        </div>
      </main>
    </>
  );
};
