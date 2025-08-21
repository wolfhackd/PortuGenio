import { getPortugueseTip } from '../sevices/gemini/getPortugueseTip.js';
export const portugueseTipRoute = (app) => {
    app.get('/getTip', async (_, reply) => {
        const tip = await getPortugueseTip();
        if (!tip) {
            throw new Error('Não foi possível gerar resposta.');
        }
        return reply.status(201).send({ tip });
    });
};
