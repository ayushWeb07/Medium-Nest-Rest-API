import {
  pgTable,
  varchar,
  timestamp,
  serial,
  pgEnum,
  boolean,
  text,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { articles } from './article.schema';

export const usersRolesEnum = pgEnum('role', ['user', 'admin']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),

  username: varchar('username', { length: 50 }).notNull(),
  email: varchar('email', { length: 50 }).unique().notNull(),
  password: varchar('password', { length: 60 }).notNull(),
  role: usersRolesEnum('role').notNull().default('user'),
  isVerified: boolean('is_verified').notNull().default(false),

  verificationToken: text('verification_token'),
  verificationTokenExpiresAt: timestamp('verification_token_expires_at', {
    mode: 'string',
  }),
  resetToken: text('reset_token'),
  resetTokenExpiresAt: timestamp('refresh_token_expires_at', {
    mode: 'string',
  }),

  refreshToken: text('refresh_token'),

  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date().toISOString()),
});

export const usersRelations = relations(users, ({ many }) => ({
  articles: many(articles),
}));
