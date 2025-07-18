import fastifyCors from '@fastify/cors';
import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { env } from './env.ts';
import { grammarCorrectionRoute } from './routes/grammar-correction.ts';
import { portugueseTipRoute } from './routes/portugueseTip.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: 'http://localhost:5173',
});

app.register(grammarCorrectionRoute);
app.register(portugueseTipRoute);

app.get('/health', () => {
  return 'Ok';
});

app.listen(
  {
    port: env.PORT,
  },
  () => {
    // biome-ignore lint/suspicious/noConsole: <OnlyDev>
    console.log(`http://localhost:${env.PORT}/`);
  }
);
