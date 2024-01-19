import React, { Suspense } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Sidebar from "../_components/sidebar";

import ChatListSkeleton from "../_components/chatlist-skeleton";
import ChatContentWrapper from "./_components/chat-content-wrapper";
import ChatContent from "./_components/chat-content";
import { createChat } from "./actions";
import ChatPageSkeleton from "../_components/chatpage-skeleton";

const Page = ({ params }: { params: { chatId?: string } }) => {
  const chatId = params.chatId?.[0];
  return (
    <ResizablePanelGroup direction="horizontal" className="flex-1 h-full">
      <ResizablePanel
        className="h-screen"
        defaultSize={20}
        minSize={10}
        maxSize={30}
      >
        <Suspense fallback={<ChatListSkeleton />}>
          <Sidebar />
        </Suspense>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80} className="relative">
        {chatId ? (
          <Suspense fallback={<ChatPageSkeleton />}>
            <ChatContentWrapper chatId={chatId} />
          </Suspense>
        ) : (
          <ChatContent createChat={createChat} />
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Page;
