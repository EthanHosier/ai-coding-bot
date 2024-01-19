import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ChatListSkeleton = () => {
  return (
    <div className="bg-black h-full flex-1 text-primary p-2 flex flex-col">
      <div className="rounded-lg w-full flex justify-between gap-2 p-2">
        <Skeleton className="size-6 rounded-full" />
        <Skeleton className="flex-1 " />
      </div>

      <Skeleton className="rounded-lg flex h-6 mt-4 w-full" />
      <Skeleton className="rounded-lg flex h-6 mt-2 w-full" />
      <Skeleton className="rounded-lg flex h-6 mt-2 w-full" />
      <Skeleton className="rounded-lg flex h-6 mt-2 w-full" />
    </div>
  );
};

export default ChatListSkeleton;
