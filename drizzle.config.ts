import { defineConfig } from "drizzle-kit";
import * as dotenv from 'dotenv';
import { url } from "inspector";

dotenv.config({
    path: ".env.local"
});

export default defineConfig({
    schema: './src/lib/db/schema.ts',
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});