import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { initialProgrammerMessages } from "./messages";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/* "Serverless funcitons have a maximum duration, meaning it isn't possible to stream indefinitely.
Edge functions do not have a maximum duration but you must send an initial response within 25 seconds.
You can continue streaming a response beyond that time." */
export const runtime = "edge";

export async function POST(req: Request) {
  const { content } = await req.json();

  const response = await openai.chat.completions.create({
    messages: [...initialProgrammerMessages, { role: "user", content }],
    model: "gpt-4-vision-preview",
    stream: true,
    max_tokens: 4096, //be careful with this one as price
  });

  console.log({ content });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
