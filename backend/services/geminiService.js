import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI = null;

const getClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!genAI) genAI = new GoogleGenerativeAI(apiKey);
  return genAI;
};

export const isGeminiAvailable = () => Boolean(process.env.GEMINI_API_KEY);

export const generateText = async (prompt, systemInstruction = '') => {
  const client = getClient();
  if (!client) {
    const err = new Error('AI Service unavailable');
    err.statusCode = 503;
    throw err;
  }

  const model = client.getGenerativeModel({
    model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
    ...(systemInstruction ? { systemInstruction } : {}),
  });

  const result = await model.generateContent(prompt);
  return result.response.text();
};

export const generateJSON = async (prompt, systemInstruction = '') => {
  const text = await generateText(
    `${prompt}\n\nRespond with valid JSON only. No markdown fences.`,
    systemInstruction
  );
  const cleaned = text.replace(/```json\n?|\n?```/g, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const err = new Error('AI returned an invalid response. Please try again.');
    err.statusCode = 502;
    throw err;
  }
};

export const chatWithHistory = async (messages, userName = 'User') => {
  const client = getClient();
  if (!client) {
    const err = new Error('AI Service unavailable');
    err.statusCode = 503;
    throw err;
  }

  const model = client.getGenerativeModel({
    model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
    systemInstruction: `You are CareerHub AI, a helpful career assistant for Indian job seekers. Be concise, practical, and encouraging. The user's name is ${userName}.`,
  });

  const history = messages.slice(0, -1).map((m) => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }],
  }));

  const chat = model.startChat({ history });
  const lastMessage = messages[messages.length - 1];
  const result = await chat.sendMessage(lastMessage.content);
  return result.response.text();
};
