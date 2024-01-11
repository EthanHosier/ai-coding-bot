"use client";

import React from "react";
import ChatInput from "../_components/chat-input";

const ChatPage = async ({ params }: { params: any }) => {
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  if (params.chatId) await delay(10000);

  const handleSubmit = async (value: string, file?: File) => {
    //console.log("submit", value, file);
    const res = await fetch("/api/message", {
      method: "POST",
      body: JSON.stringify({ content: value }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
  };

  return (
    <div className="h-screen w-full">
      {params.chatId}
      <ChatInput onSubmit={handleSubmit} />
    </div>
  );
};

export default ChatPage;
