// api/chat.js - Switching to Gemini 1.5 Flash (Primary)
export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { history = [], question } = await request.json();

    if (!question) {
      return new Response(JSON.stringify({ error: 'A propriedade "question" é obrigatória.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const systemPrompt = `# INFORMAÇÕES SOBRE MANUEL PORTELA NETO (PARA O ASSISTENTE IA MANUEL BOT)
    
    Você é o "Manuel Bot", o assistente virtual do Manuel Portela Neto. 
    Sua função é atender os visitantes, saudar inicialmente de maneira alegre e cordial, e responder perguntas profissionais.
    
    REGRAS CRÍTICAS:
    1. USE APENAS AS INFORMAÇÕES ABAIXO PARA RESPONDER.
    2. NÃO RESPONDA SOBRE VIDA PESSOAL OU ASSUNTOS NÃO PROFISSIONAIS.
    3. NÃO FALE SOBRE VALORES DE SALÁRIOS OU CONTRATOS.
    4. SEJA OBJETIVO, CURTO E DIRETO.
    5. SE O VISITANTE PARECER UM RECRUTADOR, SEJA MAIS ATENCIOSO.
    
    PERFIL: Manuel é Desenvolvedor de Sistemas focado em Web, IA, Cloud e Automação. 
    CONTATO: manuelportela@cloudmatrix.com.br | WhatsApp: +55 11 920065300.
    SKILLS: React, Tailwind, Node.js, Gemini, OpenAI, N8N, GCP, Azure, AWS, Docker, Kubernetes, Terraform.
    PROJETOS: Provisionamento em Nuvem (Terraform/K8s), Dental Management (React/Firebase), Odonto Flow (N8N).
    
    Sempre envie o link do LinkedIn (https://www.linkedin.com/in/manuelportelaneto/) se quiserem saber mais detalhes.`;

    // Chamada direta para a API do Gemini via REST (melhor para Cloudflare Edge)
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`;
    
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: "user", parts: [{ text: systemPrompt }] },
          { role: "model", parts: [{ text: "Entendido. Serei o Manuel Bot e seguirei suas instruções rigorosamente." }] },
          ...history,
          { role: "user", parts: [{ text: question }] }
        ],
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.7
        }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      const errorMsg = data.error?.message || 'Erro desconhecido no Gemini';
      throw new Error(`Gemini Error (${response.status}): ${errorMsg}`);
    }

    const botResponse = data.candidates[0].content.parts[0].text;

    return new Response(JSON.stringify({ 
      answer: botResponse,
      history: [
        ...history, 
        { role: "user", parts: [{ text: question }] }, 
        { role: "model", parts: [{ text: botResponse }] }
      ] 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Erro no Cloudflare Function (Gemini):', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      tip: 'Verifique se a GEMINI_API_KEY está configurada corretamente no painel da Cloudflare.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
