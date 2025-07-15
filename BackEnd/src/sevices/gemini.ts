import { GoogleGenAI } from '@google/genai';
import { env } from '../env.ts';

const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

const model = 'gemini-2.5-flash';

export async function correctionGrammatical(userText: string) {
  const prompt = `
    Tarefa:
    Corrija o texto abaixo com base nas regras da gramática normativa da língua portuguesa.

    Regras obrigatórias:

    Corrija erros ortográficos (ex: “concerteza” → “com certeza”).

    Corrija erros de acentuação (ex: “voce” → “você”).

    Corrija pontuação inadequada (ex: vírgulas, pontos finais, interrogação, etc).

    Corrija erros gramaticais (ex: concordância verbal e nominal, regência, uso correto de pronomes).

    Não mude o sentido do texto original.

    Não reescreva informalmente nem use sinônimos desnecessários.

    Mantenha o tom original (formal ou informal) do texto.

    A saída deve ser apenas o texto corrigido, sem explicações.

    Formato da resposta esperado:
    Texto corrido, somente com as correções aplicadas.

    Abaixo o texto a ser corrigido:

    ${userText.trim()}
    `.trim();

  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: prompt,
      },
    ],
  });

  if (!response) {
    throw new Error('Não foi possível gerar a resposta');
  }

  return response.text;
}
