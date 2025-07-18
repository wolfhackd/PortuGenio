import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { getPortugueseTip } from '../sevices/gemini/getPortugueseTip.ts';

export const portugueseTipRoute: FastifyPluginCallbackZod = (app) => {
  app.get('/getTip', async (_, reply) => {
    const tip = await getPortugueseTip();
    if (!tip) {
      throw new Error('Não foi possível gerar resposta.');
    }
    return reply.status(201).send({ tip });
  });
};
