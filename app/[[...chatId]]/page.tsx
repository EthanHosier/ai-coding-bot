"use client";

import React, { useRef, useState } from "react";
import ChatInput from "../_components/chat-input";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus as dark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { convertFileToBase64 } from "@/lib/utils";

const ChatPage = ({ params }: { params: any }) => {
  const [assistantResponse, setAssistantResonse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSubmit = async (value: string, file?: File) => {
    setIsLoading(true);
    setAssistantResonse("");

    // upload file to somewhere like s3
    // image url

    let body = "";
    if (file) {
      const imageUrl = await convertFileToBase64(file);
      const content = [
        { type: "image_url", image_url: { url: imageUrl } },
        { type: "text", text: value },
      ];
      body = JSON.stringify({ content });
    } else {
      body = JSON.stringify({ content: value });
    }

    //console.log("submit", value, file);

    try {
      abortControllerRef.current = new AbortController();
      const res = await fetch("/api/message", {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
        signal: abortControllerRef.current.signal,
      });

      if (!res.ok || !res.body) {
        alert("Error sending message");
        return;
      }
      const reader = res.body?.getReader();

      const decoder = new TextDecoder("utf-8");
      let finalResult = "";
      while (true) {
        const { value, done } = await reader.read();

        const text = decoder.decode(value);
        setAssistantResonse((currentValue) => currentValue + text);

        if (done) break;
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        alert("Error sending message");
      }
    }
    abortControllerRef.current = null;
    setIsLoading(false);
  };

  const handleStop = () => {
    setIsLoading(false);
    if (!abortControllerRef.current) return;
    abortControllerRef.current.abort();
    abortControllerRef.current = null;
  };

  return (
    <div className="h-screen overflow-y-auto">
      <div className="max-w-4xl w-full mx-auto flex-1 px-10 py-5 overflow-x-hidden prose mb-12">
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  {...rest}
                  PreTag="div"
                  children={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  style={dark}
                  wrapLines={true}
                  wrapLongLines={true}
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {assistantResponse}
        </Markdown>
      </div>
      <ChatInput
        onSubmit={handleSubmit}
        isStreaming={isLoading}
        onStop={handleStop}
      />
    </div>
  );
};

export default ChatPage;
