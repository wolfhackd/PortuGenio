import fastifyCors from '@fastify/cors';
import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { env } from './src/env.js';
import { grammarCorrectionRoute } from './src/routes/grammar-correction.js';
import { portugueseTipRoute } from './src/routes/portugueseTip.js';

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
  // console.log(`http://localhost:${env.PORT}/`);
});
