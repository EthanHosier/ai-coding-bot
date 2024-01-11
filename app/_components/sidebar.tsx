import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type chat = {
  name: string;
  url: string;
  date: "Today" | "Yesterday" | string;
};

const CHATS: chat[] = [
  {
    name: "Chat 1",
    url: "/chat1",
    date: "Today",
  },
  {
    name: "Chat 2",
    url: "/chat2",
    date: "Today",
  },
  {
    name: "Chat 3",
    url: "/chat3",
    date: "Today",
  },
  {
    name: "Chat 4",
    url: "/chat4",
    date: "Yesterday",
  },
  {
    name: "Chat 5",
    url: "/chat5",
    date: "Yesterday",
  },
  {
    name: "Chat 6",
    url: "/chat6",
    date: "Yesterday",
  },
];

const Sidebar = () => {
  return (
    <nav className="bg-black h-full flex-1 text-primary p-2">
      <Link href="/">
        <Button
          variant="nav"
          className="rounded-lg w-full justify-between gap-2"
        >
          <Avatar className="w-6 h-6">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          New Chat
          <span className="flex-1 flex justify-end">
            <Pencil className="w-3 h-3" />
          </span>
        </Button>
      </Link>

      <h3 className="text-sm font-medium text-secondary/60 ml-4 mt-6 mb-2">
        Today
      </h3>
      {CHATS.filter((chat) => chat.date === "Today").map((chat, i) => (
        <Button
          key={i}
          variant="nav"
          className="rounded-lg flex items-center justify-between"
          asChild
        >
          <Link href={chat.url}>{chat.name}</Link>
        </Button>
      ))}

      <h3 className="text-sm font-medium text-secondary/60 ml-4 mt-6 mb-2">
        Yesterday
      </h3>
      {CHATS.filter((chat) => chat.date === "Yesterday").map((chat, i) => (
        <Button
          key={i}
          variant="nav"
          className="rounded-lg flex items-center justify-between"
          asChild
        >
          <Link href={chat.url}>{chat.name}</Link>
        </Button>
      ))}
    </nav>
  );
};

export default Sidebar;
