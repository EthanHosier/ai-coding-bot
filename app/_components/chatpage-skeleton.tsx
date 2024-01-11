import { Skeleton } from "@/components/ui/skeleton";

const ChatPageSkeleton = () => (
  <div className="p-4 flex h-full flex-col-reverse ">
    <Skeleton className="w-1/3 h-6 rounded-lg mb-24" />
    <Skeleton className="w-full h-6 rounded-lg mb-4" />
    <Skeleton className="w-full h-6 rounded-lg mb-4" />
    <Skeleton className="w-full h-6 rounded-lg mb-4" />
    <Skeleton className="w-32 h-10 rounded-lg mb-4 mt-16" />

    <Skeleton className="w-full h-24 rounded-lg mt-15 mb-4" />
    <Skeleton className="w-full h-6 rounded-lg mb-4" />
    <Skeleton className="w-full h-24 rounded-lg mb-4" />
    <Skeleton className="w-32 h-10 rounded-lg mb-4 mt-16" />

    <Skeleton className="w-1/3 h-6 rounded-lg mb-4" />
    <Skeleton className="w-full h-6 rounded-lg mb-4" />
    <Skeleton className="w-full h-6 rounded-lg mb-4" />
    <Skeleton className="w-full h-6 rounded-lg mb-4" />
    <Skeleton className="w-32 h-10 rounded-lg mb-4" />
  </div>
);

export default ChatPageSkeleton;
