import { z } from 'zod';

const envSchema = z.object({
  VITE_NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  VITE_BACKEND_ORIGIN: z.string().transform((val) => val.split(',')),
});

export const env = envSchema.parse(import.meta.env);
