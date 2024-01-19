import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { db } from "@/db";
import { chats as chatsTable } from "@/db/schema/chats";
import { unstable_cache as cache } from "next/cache";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";

const getChats = cache(
  async (userId: string) =>
    await db
      .select({ id: chatsTable.id, name: chatsTable.name })
      .from(chatsTable)
      .where(eq(chatsTable.userId, userId))
      .all(),
  ["get-chats-for-chat-list"],
  { tags: ["get-chats-for-chat-list"] }
);

const Sidebar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  console.log({ user });

  const chats = user ? await getChats(user.id) : [];

  return (
    <nav className="bg-black h-full flex-1 text-primary p-2 flex flex-col justify-between">
      <div>
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

        {chats.map((chat) => (
          <Button
            key={chat.id}
            variant="nav"
            className="rounded-lg flex items-center justify-between"
            asChild
          >
            <Link href={`/${chat.id}`} className="truncate">
              {chat.name}
            </Link>
          </Button>
        ))}
      </div>

      <div className="text-white flex flex-col mb-4">
        {user ? (
          <>
            <p>{user.given_name}</p>
            <p>{user.family_name}</p>
            <LogoutLink>Logout</LogoutLink>
          </>
        ) : (
          <>
            <LoginLink>Sign in</LoginLink>
            <RegisterLink>Sign up</RegisterLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Sidebar;
