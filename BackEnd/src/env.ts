import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.coerce.number().default(3333),
  GEMINI_API_KEY: z.string(),
  CORS_ORIGIN: z.string().transform((val) => val.split(',')),
});

export const env = envSchema.parse(process.env);
