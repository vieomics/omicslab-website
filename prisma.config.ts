import "dotenv/config";
import { defineConfig, env } from "prisma/config";
import path from "path";

// Load .env.local explicitly
import * as dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, ".env.local") });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url:
      process.env.DATABASE_URL ||
      "postgresql://postgres:postgres@localhost:5432/gianglabs?schema=public",
  },
});
