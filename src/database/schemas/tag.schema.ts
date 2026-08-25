import { mysqlTable, varchar, timestamp } from 'drizzle-orm/mysql-core';

export const tags = mysqlTable('tags', {
  id: varchar('id', { length: 36 }).primaryKey(), // no defaultRandom() uuid in mysql-core — generate in app code
  email: varchar('email', { length: 255 }).notNull().unique(),
  username: varchar('username', { length: 50 }).notNull(),
  password: varchar('password', { length: 255 }),
  googleId: varchar('google_id', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
});
