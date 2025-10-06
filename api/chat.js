// api/chat.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Configuração dos clientes
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { history = [], question, sessionId } = request.body;
        
        // Carrega a base de conhecimento (forma síncrona, segura para serverless)
        const knowledgeBasePath = path.resolve('./knowledge_base.txt');
        const knowledgeBase = fs.readFileSync(knowledgeBasePath, 'utf8');

        const systemPrompt = `Você é "Manuel (bot)", um assistente de IA amigável... (COPIE SEU PROMPT COMPLETO AQUI). 
        Use as informações a seguir como sua única base de conhecimento: \n\n${knowledgeBase}`;

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const chat = model.startChat({
            history: [
                { role: "user", parts: [{ text: systemPrompt }] },
                { role: "model", parts: [{ text: "Entendido. Sou o Manuel (bot) e estou pronto." }] },
                ...history,
            ],
        });
        
        const result = await chat.sendMessage(question);
        const botResponse = result.response.text();
        
        const newHistory = [...history, { role: "user", parts: [{ text: question }] }, { role: "model", parts: [{ text: botResponse }] }];

        // Log assíncrono para a Supabase (não bloqueia a resposta)
        supabase.from('chat_logs').upsert({ session_id: sessionId, conversation: newHistory, updated_at: new Date().toISOString() }).then();

        return response.status(200).json({ answer: botResponse, history: newHistory });

    } catch (error) {
        console.error('Erro no backend:', error);
        return response.status(500).json({ error: 'Falha ao comunicar com a IA.' });
    }
}