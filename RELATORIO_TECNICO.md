# Relatório Técnico do Projeto: Manuel Portela Portfolio

## 1. Propósito do Projeto
O projeto é um **Portfólio Pessoal Interativo** desenvolvido como uma Single Page Application (SPA). O objetivo principal é apresentar as habilidades, experiência e projetos de Manuel Portela Neto. O diferencial do projeto é a integração de um **Chatbot com Inteligência Artificial (Google Gemini)** que atua como um assistente virtual ("Manuel Bot"), capaz de responder perguntas sobre a carreira do profissional, simulando uma conversa natural com recrutadores e visitantes.

## 2. Detalhes Técnicos
### Stack Principal
- **Frontend**: React 19, React DOM 19
- **Build Tool**: Vite 6.0.0
- **Linguagem**: JavaScript (ES Modules habilitado via `"type": "module"`)
- **Estilização**: Tailwind CSS 3.3.5, PostCSS, Autoprefixer
- **UI Libraries**: Framer Motion (animações), Lucide React (ícones), Headless UI, React Tooltip
- **Integrações**: 
  - **Google Analytics 4** (`react-ga4`)
  - **Google Gemini AI** (`@google/generative-ai`)
  - **Supabase** (Client instalado mas comentado/desativado no código do backend)

### Infraestrutura & Backend
- **Hospedagem Frontend**: Provavelmente Vercel (indicado por `vercel.json`).
- **Serverless Functions**: Diretório `api/chat.js` configurado para rodar na Vercel (Runtime: `nodejs18.x`).
- **Backend Atual do Chat**: O componente frontend `Chatbot.jsx` aponta para um backend externo no Render (`https://manuel-bot-backend.onrender.com`), ignorando a função serverless local.

## 3. Análise de Falhas e Melhorias Sugeridas

Abaixo listamos as correções e melhorias identificadas, classificadas por prioridade.

### 🔴 Crítico (Correções Imediatas)
1.  **Duplicidade de Contexto na API (`api/chat.js`)**:
    - **Problema**: O arquivo `api/chat.js` define uma variável `systemPrompt` que hardcode a instrução E depois concatena o conteúdo do arquivo `knowledge_base.txt`. Como o `knowledge_base.txt` já contém as instruções e os dados, o bot recebe todo o contexto **duas vezes**.
    - **Correção**: Remover a string hardcoded em `api/chat.js` e carregar o prompt inteiramente do arquivo `knowledge_base.txt`, ou vice-versa, para economizar tokens e evitar confusão do modelo.

2.  **Hardcoded Backend URL**:
    - **Problema**: `src/components/Chatbot.jsx` faz fetch para `https://manuel-bot-backend.onrender.com/api/chat`.
    - **Melhoria**: Deve-se usar uma variável de ambiente `import.meta.env.VITE_API_URL` ou configurar para usar a rota relativa `/api/chat` se a intenção for migrar tudo para a Vercel (o que eliminaria o custo/necessidade do Render).

3.  **Configuração do ESLint 9**:
    - **Problema**: O projeto usa `eslint` v9.17.0 mas o script de lint no `package.json` usa a flag `--ext` (`eslint . --ext js,jsx`), que foi depreciada/removida no novo sistema "Flat Config" do ESLint 9. Isso fará o lint falhar ou não rodar corretamente.
    - **Correção**: Criar um arquivo `eslint.config.js` moderno e atualizar o script no `package.json`.

### 🟡 Importante (Boas Práticas e Segurança)
4.  **Exposição de IDs**:
    - **Problema**: O `MEASUREMENT_ID` do Google Analytics está hardcoded no `App.jsx`.
    - **Correção**: Mover para arquivo `.env` (ex: `VITE_GA_MEASUREMENT_ID`).

5.  **Consistência de Módulos (CJS vs ESM)**:
    - **Problema**: O projeto é definido como `"type": "module"`, mas o arquivo `api/chat.js` usa sintaxe CommonJS (`require`, `module.exports`). Embora a Vercel trate funções isoladamente, é ideal padronizar para ES Modules (`import`/`export`) se o runtime suportar, ou renomear para `.cjs` se for estritamente necessário.
    - **Observação**: O arquivo `vite.config.js` já usa ESM (`import`).

6.  **Limpeza de Arquivos**:
    - **Problema**: Arquivo `requirements.txt` vazio na raiz (resquício provável de tentativa de deploy Python ou cópia de outro projeto).
    - **Correção**: Excluir arquivo.

### 🟢 Melhorias (Performance e SEO)
7.  **Otimização do Knowledge Base**:
    - O arquivo `knowledge_base.txt` é extenso. Pode-se otimizar o texto para consumir menos tokens do Gemini, mantendo a qualidade da resposta.

8.  **SEO Tags**:
    - A meta tag `keywords` no `index.html` é ignorada pela maioria dos buscadores modernos (Google). Focar na `description` e Open Graph é mais efetivo (o que já está bem feito).

## 4. Próximos Passos
Recomenda-se iniciar pelas correções críticas: normalizar a API (decidir se usa Vercel ou Render), corrigir o prompt duplicado e ajustar o ESLint para garantir a qualidade do código.
