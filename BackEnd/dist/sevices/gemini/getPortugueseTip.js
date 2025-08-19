import { gemini, model } from './index.js';
export const getPortugueseTip = async () => {
    const prompt = `
Você é um professor de português. 
Forneça uma dica curta, prática e útil de português (gramática, ortografia ou concordância). 
A dica deve ter no máximo 2 frases e ser clara, objetiva e fácil de entender.

Formato esperado:
"Dica: [sua dica aqui]"
`;
    const response = await gemini.models.generateContent({
        model,
        contents: [{ text: prompt }],
    });
    return response.text?.trim();
};
