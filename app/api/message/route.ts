import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { initialProgrammerMessages } from "./messages";

import { db } from "@/db";
import { chats } from "@/db/schema/chats";
import { eq } from "drizzle-orm";
import { messages } from "@/db/schema/messages";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/* "Serverless funcitons have a maximum duration, meaning it isn't possible to stream indefinitely.
Edge functions do not have a maximum duration but you must send an initial response within 25 seconds.
You can continue streaming a response beyond that time." */
export const runtime = "edge";

export async function POST(req: Request) {
  const { content, chatId } = await req.json();

  // check if user logged in
  // mkae sure that chat belongs to them
  if (!chatId) {
    return new Response("chatId is required", { status: 400 });
  }

  const chat = await db.select().from(chats).where(eq(chats.id, chatId)).get();

  if (!chat) {
    return new Response("chat not found", { status: 404 });
  }

  // for this application, if just send in all user messages and last thing
  // the gpt responds with, you still get the same results
  // just need prompts from user and last thing gpt responded with
  const allDBMessages = await db
    .select({
      role: messages.role,
      content: messages.content,
    })
    .from(messages)
    .where(eq(messages.chat_id, chatId))
    .orderBy(messages.createdAt)
    .all();

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      ...initialProgrammerMessages,
      ...allDBMessages,
      { role: "user", content },
    ],
    model: "gpt-4-vision-preview",
    stream: true,
    max_tokens: 4096, //be careful with this one as price
  });

  console.log({ content });

  const stream = OpenAIStream(chatCompletion, {
    onStart: async () => {},
    onToken: async (token: string) => {},
    onCompletion: async (completion: string) => {
      try {
        await db.insert(messages).values([
          { chat_id: chatId, role: "user", content: content },
          { chat_id: chatId, role: "assistant", content: completion },
        ]);
      } catch (e) {
        console.error(e);
      }
    },
  });

  return new StreamingTextResponse(stream);
}
