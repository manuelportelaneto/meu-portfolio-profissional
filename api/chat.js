// api/chat.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import process from 'process';

// Configura a API do Gemini.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { history = [], question, threadId } = request.body;

        if (!question) {
            return response.status(400).json({ error: 'A propriedade "question" é obrigatória.' });
        }

        // Lê a base de conhecimento localmente
        const knowledgeBasePath = path.join(process.cwd(), 'knowledge_base.txt');
        const systemPrompt = fs.readFileSync(knowledgeBasePath, 'utf8');

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Constrói o histórico para o chat
        const chatHistory = [
            { role: "user", parts: [{ text: systemPrompt }] },
            { role: "model", parts: [{ text: "Entendido. Estou pronto para ajudar com base nessas informações." }] },
            ...history,
        ];

        const chat = model.startChat({
            history: chatHistory,
        });

        const result = await chat.sendMessage(question);
        const botResponse = result.response.text();

        // Atualiza o histórico para devolver ao cliente (opcional, dependendo de como o front gerencia)
        const newHistory = [...history, { role: "user", parts: [{ text: question }] }, { role: "model", parts: [{ text: botResponse }] }];

        return response.status(200).json({ answer: botResponse, history: newHistory, threadId });

    } catch (error) {
        console.error('Erro no backend:', error);
        return response.status(500).json({ error: 'Falha ao se comunicar com a IA.' });
    }
}