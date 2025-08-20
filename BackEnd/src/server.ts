import 'dotenv/config';
import { config } from 'dotenv';

// Carrega o .env certo dependendo do NODE_ENV
config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development',
});
import { env } from './env.js';

import fastifyCors from '@fastify/cors';
import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { grammarCorrectionRoute } from './routes/grammar-correction.js';
import { portugueseTipRoute } from './routes/portugueseTip.js';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: env.CORS_ORIGIN,
});

app.register(grammarCorrectionRoute);
app.register(portugueseTipRoute);

app.get('/health', () => {
  return 'Ok';
});

app.listen({ port: env.PORT, host: '0.0.0.0' }, () => {
  // biome-ignore lint/suspicious/noConsole: <OnlyDev>
  console.log(`http://localhost:${env.PORT}/`);
});
