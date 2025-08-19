import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { correctionGrammatical } from '../sevices/gemini/correctionGrammatical.js';

export const grammarCorrectionRoute: FastifyPluginCallbackZod = (app) => {
  const correctionSchema = z.object({
    text: z.string().nonempty(),
  });

  // type CorrectionSchema = z.infer<typeof correctionSchema>;

  app.post('/correction', async (request, reply) => {
    const { text } = correctionSchema.parse(request.body);
    const result = await correctionGrammatical(text);

    const corrected =
      result.text && typeof result.text === 'object' && result.text.text
        ? {
            text: result.text.text,
            errors: result.text.errors ?? [],
          }
        : result;

    return reply.status(201).send(corrected);
    // return reply.status(201).send(result);
  });
};
