import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

// strings is what db sees
export const chats = sqliteTable("chats", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// id
// name
// created_at
