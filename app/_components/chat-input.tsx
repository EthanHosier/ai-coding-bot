"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUp, StopCircle } from "lucide-react";
import ImageInput from "./image-input";

interface ChatInputProps {
  onSubmit: (value: string, file?: File) => void;
  isStreaming: boolean;
  onStop: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSubmit,
  onStop,
  isStreaming,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (isStreaming) {
      onStop();
    } else {
      onSubmit(e.target.text.value, e.target.media.files[0]);
      e.target.text.value = "";
    }
  };

  return (
    <form
      className="absolute bottom-0 flex-1 w-full px-4 pr-8 mb-4 gap-2 flex"
      onSubmit={handleSubmit}
    >
      <ImageInput
        setSelectedImage={setSelectedImage}
        selectedImage={selectedImage}
      />
      <Input className="flex-1" name="text" />
      <Button>
        {isStreaming ? (
          <StopCircle className="w-5 h-5" />
        ) : (
          <ArrowUp className="w-5 h-5" />
        )}
      </Button>
    </form>
  );
};

export default ChatInput;
