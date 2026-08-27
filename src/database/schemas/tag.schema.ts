import { pgTable, varchar, timestamp, serial } from 'drizzle-orm/pg-core';

export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 100 }).notNull(),
  description: varchar('description', { length: 300 }).notNull(),

  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date().toISOString()),
});
