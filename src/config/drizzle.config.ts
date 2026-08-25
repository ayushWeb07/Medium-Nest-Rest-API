import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: '.././database/',
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});