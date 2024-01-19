// so can suspend on this
import { desc, eq, and } from "drizzle-orm";
import { createChat } from "../actions";
import ChatContent from "./chat-content";

import { db } from "@/db";
import { messages as messagesTable } from "@/db/schema/messages";

export default async function ChatContentWrapper({
  chatId,
}: {
  chatId: string;
}) {
  const message = await db
    .select()
    .from(messagesTable)
    .where(
      and(
        eq(messagesTable.chat_id, chatId),
        eq(messagesTable.role, "assistant")
      )
    )
    .orderBy(desc(messagesTable.createdAt))
    .limit(1)
    .get();

  return (
    <ChatContent
      createChat={createChat}
      initalAssistantResponse={message?.content}
    />
  );
}
