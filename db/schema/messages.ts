import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { chats } from "./chats";

export const messages = sqliteTable("messages", {
  id: integer("id").notNull().primaryKey(),
  chat_id: text("chat_id")
    .notNull()
    .references(() => chats.id), // foreign key
  role: text("role", { enum: ["user", "assistant"] }).notNull(), // don't store system messages in db
  content: text("content").notNull(),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// id
// chat_id
// content
// role 'user' | 'system' | 'assistant'
// created_at
