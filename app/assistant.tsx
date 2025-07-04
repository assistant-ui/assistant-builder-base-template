"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { Thread } from "@/components/assistant-ui/thread";
import { Header } from "@/components/header";
import { UserProfile } from "@clerk/nextjs";
import { useState } from "react";

export const Assistant = () => {
  const runtime = useChatRuntime({
    api: "/api/chat",
  });
  
  const [activeTab, setActiveTab] = useState<string>("Assistant");

  const renderContent = () => {
    switch (activeTab) {
      case "Assistant":
        return <Thread />;
      case "Profile":
        return (
          <div className="flex justify-center items-center h-full p-4">
            <UserProfile />
          </div>
        );
      case "About":
        return (
          <div className="flex justify-center items-center h-full p-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">About</h1>
              <p className="text-lg">This is the About section.</p>
            </div>
          </div>
        );
      case "Services":
        return (
          <div className="flex justify-center items-center h-full p-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Services</h1>
              <p className="text-lg">This is the Services section.</p>
            </div>
          </div>
        );
      case "Contact":
        return (
          <div className="flex justify-center items-center h-full p-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Contact</h1>
              <p className="text-lg">This is the Contact section.</p>
            </div>
          </div>
        );
      default:
        return <Thread />;
    }
  };

  return (
    <AssistantRuntimeProvider runtime={runtime}>
     <div className="flex h-screen w-screen flex-col">
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
            <Header onTabChange={setActiveTab} />
            {renderContent()}
        </div>
      </div>
     </div>
    </AssistantRuntimeProvider>
  );
};
