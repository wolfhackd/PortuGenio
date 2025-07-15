import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { correctionGrammatical } from '../sevices/gemini.ts';

export const grammarCorrectionRoute: FastifyPluginCallbackZod = (app) => {
  const correctionSchema = z.object({
    textForCorrection: z.string().nonempty(),
  });

  app.post('/correction', async (request, reply) => {
    const { textForCorrection } = correctionSchema.parse(request.body);
    const result = await correctionGrammatical(textForCorrection);
    return reply.status(201).send(result);
  });
};
