import { gemini, model } from './index.ts';

export async function correctionGrammatical(userText: string) {
  const prompt = `
Tarefa:
Corrija o texto abaixo com base nas regras da gramática normativa da língua portuguesa.

Regras obrigatórias:
1. Corrija erros ortográficos, de acentuação, pontuação, concordância verbal e nominal, regência e uso de pronomes.
2. Não mude o significado original do texto.
3. Mantenha o mesmo tom (formal ou informal).
4. Não use sinônimos desnecessários nem reescreva informalmente.

Formato da resposta:
Retorne a resposta em **formato JSON**, no seguinte padrão:

{
  "text": "Texto corrigido aqui.",
  "errors": [
    {
      "word": "palavra ou trecho original",
      "reason": "descrição da correção feita",
      "start": 5,
      "end": 10
    }
  ]
}

Importante:
NÃO use blocos de código (ex: crases \`\`\` ou \`\`\`json). Apenas envie o JSON puro, sem marcações extras.

Texto a ser corrigido:
"${userText.trim()}"
`.trim();

  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: prompt,
      },
    ],
  });

  if (!response?.text) {
    throw new Error('Não foi possível gerar a resposta');
  }

  try {
    const cleaned = response.text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    const parsed = JSON.parse(cleaned);

    if (parsed.text && typeof parsed.text === 'object' && parsed.text.text) {
      return {
        text: parsed.text.text,
        errors: parsed.text.errors || [],
      };
    }

    return parsed;
  } catch {
    throw new Error('Resposta inesperada do modelo');
  }
}
