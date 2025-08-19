import { GoogleGenAI } from '@google/genai';
import { env } from '../../env.js';
export const gemini = new GoogleGenAI({
    apiKey: env.GEMINI_API_KEY,
});
export const model = 'gemini-2.5-flash';
