// api/chat.js - Deployment Trigger: Internal Server Error Fix
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

    const messages = [
      { role: "system", content: systemPrompt },
      ...history.map(h => ({
        role: h.role === "model" ? "assistant" : "user",
        content: h.parts[0].text
      })),
      { role: "user", content: question }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", 
        messages: messages,
        max_tokens: 500,
        temperature: 0.7
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    const botResponse = data.choices[0].message.content;

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
    console.error('Erro no Cloudflare Function (OpenAI):', error);
    return new Response(JSON.stringify({ error: 'Erro interno na comunicação com a OpenAI. Verifique se a OPENAI_API_KEY está configurada no painel da Cloudflare.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
