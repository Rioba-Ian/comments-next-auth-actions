import { z } from "zod";

const envSchema = z.object({
 NEXTAUTH_URL: z.string(),
 NEXTAUTH_SECRET: z.string(),
 GOOGLE_CLIENT_ID: z.string(),
 GOOGLE_CLIENT_SECRET: z.string(),
 GITHUB_CLIENT_ID: z.string(),
 GITHUB_CLIENT_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
