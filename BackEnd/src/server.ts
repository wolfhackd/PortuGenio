import fastifyCors from '@fastify/cors';
import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { env } from './env.js';
import { grammarCorrectionRoute } from './routes/grammar-correction.js';
import { portugueseTipRoute } from './routes/portugueseTip.js';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: [
    'https://portu-genio-wolfhackds-projects.vercel.app',
    'https://portu-genio-git-main-wolfhackds-projects.vercel.app',
    'http://localhost:5173',
    'https://portu-genio.vercel.app',
  ],
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
