"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Paperclip, Trash } from "lucide-react";
import React, { useRef } from "react";

interface ImageInputProps {
  setSelectedImage: (file: File | undefined) => void;
  selectedImage: File | undefined;
}

const ImageInput: React.FC<ImageInputProps> = ({
  setSelectedImage,
  selectedImage,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedImage(file);
  };

  const handleClick = () => {
    inputRef?.current?.click();
  };

  const handleDeleteImage = () => {
    setSelectedImage(undefined);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        name="media"
        type="file"
        accept="image/jpeg,image/png"
        className="hidden"
        onChange={onImageChange}
      />
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button onClick={handleClick} type="button" className="relative">
            <Paperclip className="w-5 h-5" />
            {selectedImage && (
              <div className="absolute z-10 w-5 flex items-center justify-center bg-red-500 aspect-square rounded-full -top-1 -right-1 text-xs">
                1
              </div>
            )}
          </Button>
        </HoverCardTrigger>
        {selectedImage && (
          <HoverCardContent className="flex items-center justify-center gap-4">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected Image"
              className="max-w-48 max-h-48"
            />
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeleteImage}
            >
              <Trash className="w-5 h-5" />
            </Button>
          </HoverCardContent>
        )}
      </HoverCard>
    </>
  );
};

export default ImageInput;
