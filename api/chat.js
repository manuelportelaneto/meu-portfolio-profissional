// api/chat.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import process from 'process';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { history = [], question } = request.body;

        if (!question) {
            return response.status(400).json({ error: 'A propriedade "question" é obrigatória.' });
        }

        const knowledgeBasePath = path.join(process.cwd(), 'knowledge_base.txt');
        const systemPrompt = fs.readFileSync(knowledgeBasePath, 'utf8');

        // Configuração do modelo com instruções do sistema
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash", // Usando flash para melhor desempenho/custo
            systemInstruction: systemPrompt 
        });

        const chat = model.startChat({
            history: history,
            generationConfig: {
                maxOutputTokens: 500,
                temperature: 0.7,
            },
        });

        const result = await chat.sendMessage(question);
        const botResponse = result.response.text();

        return response.status(200).json({ 
            answer: botResponse,
            // Retornamos o histórico atualizado para o front manter o estado
            history: [
                ...history, 
                { role: "user", parts: [{ text: question }] }, 
                { role: "model", parts: [{ text: botResponse }] }
            ] 
        });

    } catch (error) {
        console.error('Erro no backend do Manuel Bot:', error);
        return response.status(500).json({ error: 'Falha ao processar sua pergunta. Tente novamente em instantes.' });
    }
}