import path from 'node:path';
import { config } from 'dotenv';
import { z } from 'zod';

// CARREGA O .env PRIMEIRO!
const envFile =
  process.env.NODE_ENV === 'production' ? '.env' : '.env.development';

config({
  path: path.resolve(process.cwd(), envFile),
});

// DEPOIS VALIDA
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.coerce.number().default(3333),
  GEMINI_API_KEY: z.string(),
  CORS_ORIGIN: z.string().transform((val) => val.split(',')),
});

export const env = envSchema.parse(process.env);
