# main.py
# Bem-vindo às Cloud Functions para Firebase com Python!
from firebase_functions import https_fn, options
from firebase_admin import initialize_app, firestore
import google.cloud.aiplatform as aiplatform
import json
import os # Importa a biblioteca para ler variáveis de ambiente

# =========================================================================
# === INICIALIZAÇÃO E CONFIGURAÇÃO ===
# =========================================================================
# O Firebase inicializa o app automaticamente no ambiente de produção.
initialize_app()
db = firestore.client()

# --- Preencha estas variáveis ---
# (Certifique-se de que este é o ID do seu projeto no Google Cloud)
PROJECT_ID = "cloud-matrix-469819" 
# (Esta é a região mais comum e recomendada para a Vertex AI)
LOCATION = "us-central1"
# --------------------------------

aiplatform.init(project=PROJECT_ID, location=LOCATION)

# Define as configurações de segurança para o modelo Gemini
safety_settings = {
    "HARM_CATEGORY_HARASSMENT": "BLOCK_NONE",
    "HARM_CATEGORY_HATE_SPEECH": "BLOCK_NONE",
    "HARM_CATEGORY_SEXUALLY_EXPLICIT": "BLOCK_NONE",
    "HARM_CATEGORY_DANGEROUS_CONTENT": "BLOCK_NONE",
}
# =========================================================================

# =========================================================================
# === FUNÇÃO HTTP PRINCIPAL DO CHATBOT ===
# =========================================================================
# Define que a função é chamada via HTTP e configura as permissões de CORS
@https_fn.on_request(
    cors=options.CorsOptions(
        # Permite que seu portfólio (local e em produção) façam requisições.
        cors_origins=["https://manuelportelaneto.cloudmatrix.com.br", "http://localhost:3000"],
        cors_methods=["post"]
    )
)
def chat(req: https_fn.Request) -> https_fn.Response:
    """
    Função principal que recebe as requisições do chatbot, processa com a Vertex AI
    e armazena os logs no Firestore.
    """
    try:
        # 1. Obter e validar dados da requisição do frontend
        body = req.get_json()
        history = body.get("history", [])
        question = body.get("question")
        session_id = body.get("sessionId")
        
        if not all([question, session_id]):
            return https_fn.Response(json.dumps({"error": "Requisição inválida. 'question' e 'sessionId' são obrigatórios."}), status=400, headers={"Content-Type": "application/json"})

    except Exception:
        return https_fn.Response(json.dumps({"error": "Corpo da requisição inválido ou não é JSON."}), status=400, headers={"Content-Type": "application/json"})

    try:
        # 2. Obter a base de conhecimento que armazenamos no Firestore
        query = db.collection(u'knowledge_base').order_by(u'version', direction=firestore.Query.DESCENDING).limit(1)
        docs = query.stream()
        knowledge_base_doc = next(docs, None)
        if not knowledge_base_doc:
            raise ValueError("Base de conhecimento não foi encontrada no banco de dados Firestore.")
        
        knowledge_base = knowledge_base_doc.to_dict()['content']

        # 3. Montar o prompt do sistema para o "Manuel Bot"
        #    COPIE E COLE SEU PROMPT COMPLETO AQUI
        system_prompt = f"""Você é um assistente virtual do Manuel, canhado "Manuel Bot". Sua função é atender os visitantes da página profissional do Manuel, saudar inicialmente os visitantes de maneira alegre e cordial, responder perguntas de âmbito profissional a respeito do Manuel, coletar informações como nome do visitante e se ele é um recrutador. A princípio você deverá saudar o visitante, logo após a abertura da janela de chat.
        Caso o visitante envie a mensagem antes, você cordialmentel perguntará o nome do visitante e após sua resposta, seguirá com a resposta, chamando o visitante pelo nome quando necessário.
        Continue conversando normalmente, e no meio da conversa, após análise do teor das perguntas, pergunte se o visitante (chamando-o pelo nome) é um recrutador.
        Após isso siga a conversa normalmente respondendo as perguntas do visitante que sejam pertinentes a assuntos de trabalho, profissionais, de educação, sobre minhas habilidades e contatos.
        Caso seja perguntado, sim eu uso IA para acelerar e otimizar processos de desenvolvimento, que tenho habilidades únicas de usar a IA solucionando problemas de maneira rápida.
        Antes de iniciar uma conversa você checará no banco de dados se já há algum registro do mesmo visitante comparando o session_id. A seguir estão os parâmetros através dos quais você vai se basear para responder as perguntas. 
        Não faça pesquisas de outros assuntos aleatórios.
        Não responda sobre a minha vida pessoal.
        Não faça acordos nem fale sobre valores de salários e contratos.
        Caso o visitante queira saber mais sobre outras experiências profissionais minhas, envie meu link do Linkedin para que o visitante saiba mais por lá, pois nesta página profissional tratamos apenas de assuntos profissionais relacionados a tecnologia.
        Evite gerar respostas muito longas, seja mais curto e direto, sem perder o tom animado e a cordialidade com o visitante.

        # INFORMAÇÕES SOBRE MANUEL PORTELA NETO (PARA O ASSISTENTE IA MANUEL BOT)

        ## PERFIL PROFISSIONAL
        Meu nome é Manuel Portela Neto, sou um Desenvolvedor de Sistemas focado em Desenvolvimento Web, Inteligência Artificial, Cloud Computing e Automação de Processos. Minha trajetória começou na área de logística, onde desenvolvi uma forte habilidade para otimização e resolução de problemas, mentalidade que hoje aplico no desenvolvimento de software. Meu objetivo é criar soluções tecnológicas que geram valor real e resolvem problemas de negócio de forma eficiente. Atualmente, busco oportunidades de alto impacto onde possa aplicar minhas habilidades em Desenvolvimento Web, IA e Cloud para construir produtos inovadores.

        ## INFORMAÇÕES DE CONTATO
        - Email Comercial: manuelportela@cloudmatrix.com.br
        - Email Pessoal (para recrutadores): manuelpn@live.com
        - LinkedIn: https://www.linkedin.com/in/manuelportelaneto/
        - GitHub: https://github.com/manuelportelaneto
        - Google Dev: https://g.dev/manuelportela
        - WhatsApp (pessoal): +55 11 920065300

        Observações: Prefiro que não me liguem, pois como recebo muitas chamadas falsas, parei de atender números desconhecidos. Caso queira me contatar diretamente, sinta-se a vontade para me chamar no WhatsApp.


        ## HARD SKILLS (COMPETÊNCIAS TÉCNICAS)
        - Linguagens: JavaScript, Python, SQL, HTML, CSS
        - Frontend: React, Tailwind CSS
        - Backend: Node.js, Funções Serverless
        - IA & Automação: IA Generativa (Google Gemini, OpenAI, dentre outras), Engenharia de Prompt, N8N, Automação de Processos, RAG (Retrieval-Augmented Generation)
        - Cloud & DevOps: Google Cloud (GCP), Microsoft Azure, AWS, Docker, Kubernetes, Terraform, CI/CD com GitHub Actions
        - Bancos de Dados: Firebase, SQL, Postgres, SQLite, NoSQL, Supabase
        - Análise de Dados: Microsoft Power BI, Excel
        - Outras Ferramentas: Git, GitHub, VS Code, Linux

        ## SOFT SKILLS (COMPETÊNCIAS COMPORTAMENTAIS)
        Sou um profissional polimata (Significado de Polímata: Pessoa que tem conhecimento em muitas ciências; quem conhece ou estudou muitas ciências; Pessoa cujo conhecimento não está restrito a um único âmbito científico.) e autodidata, com forte comunicação, capacidade de resolução de problemas complexos, grande adaptabilidade e uma mentalidade focada em aprendizado contínuo e otimização de processos.

        ## EXPERIÊNCIA PROFISSIONAL E DISPONIBILIDADE
        - Trabalho atual: Atuo na área de tecnologia como freelancer pela plataforma UpWork, desenvolvendo soluções personalizadas para clientes internacionais.
        - Disponibilidade: Estou aberto a propostas de trabalho em tempo integral (CLT) ou em regime de contrato (PJ) para projetos desafiadores.

        ## VALORES DE SALÁRIOS E CONTRATOS
        - Os valores de salários e contratos não serão informados pela nossa conversa automatizada, mas, em um bate papo online ou presencial, você pode me fazer uma proposta de trabalho informando quais atividades você deseja que eu realize e quais benefícios receberei ao trabalhar na sua equipe, basta me contatar.

        ## DETALHES DOS PROJETOS PRINCIPAIS

        ### Projeto: Provisionamento de Recursos em Nuvem
        - Problema Resolvido: Algumas empresas precisavam de uma forma rápida e replicável para criar ambientes em múltiplas nuvens (Azure, GCP, AWS), reduzindo o tempo de setup manual.
        - Solução Técnica: Criação de scripts de Infraestrutura como Código (IaC) com Terraform e orquestração de contêineres com Kubernetes.
        - Impacto no Negócio: Automação do processo de setup, reduzindo o tempo de dias para minutos e eliminando erros humanos.

        ### Projeto: Dental Management System
        - Problema Resolvido: Clínicas odontológicas sofriam com sistemas de agendamento desatualizados e alta taxa de "no-shows".
        - Solução Técnica: Desenvolvimento de um sistema de gestão com React, Firebase, e automação de lembretes.
        - Impacto no Negócio: Redução significativa na taxa de ausências de pacientes e otimização do trabalho administrativo.

        ### Projeto: Odonto Flow - Smart Scheduling
        - Problema Resolvido: Processo de agendamento manual, lento e sujeito a erros.
        - Solução Técnica: Automação do fluxo de agendamento com N8N, integrando APIs como Google Calendar e serviços de email.
        - Impacto no Negócio: Eliminação de 90% do trabalho manual de agendamento, permitindo que a equipe focasse no atendimento ao cliente.

        # FIM DAS INFORMAÇÕES
        """

        # 4. Configurar e chamar o modelo da Vertex AI
        model = aiplatform.gapic.GenerativeModel("gemini-1.5-pro-preview-0409")

        # Formata o histórico do frontend para o formato que a API da Vertex espera
        history_for_vertex = []
        for msg in history:
            role = "user" if msg.get("role") == "user" else "model"
            content = msg.get("parts", [{}])[0].get("text", "")
            if content:
                history_for_vertex.append({"role": role, "content": content})
        
        # Inicia a sessão de chat, passando o contexto e o histórico
        chat_session = model.start_chat(
            context=system_prompt,
            history=history_for_vertex
        )
        
        # Envia a nova pergunta do usuário
        gemini_response = chat_session.send_message(
            content=question,
            safety_settings=safety_settings
        )
        bot_response = gemini_response.text

        # 5. Salvar o log atualizado da conversa no Firestore
        new_history_for_db = history + [
            {"role": "user", "parts": [{"text": question}]},
            {"role": "model", "parts": [{"text": bot_response}]}
        ]
        
        log_ref = db.collection(u'chat_logs').document(session_id)
        log_ref.set({
            u'conversation': new_history_for_db,
            u'last_updated': firestore.SERVER_TIMESTAMP
        }, merge=True)
        
        # 6. Retornar a resposta para o frontend
        response_payload = {
            "answer": bot_response,
            "history": new_history_for_db
        }
        return https_fn.Response(json.dumps(response_payload), status=200, headers={"Content-Type": "application/json"})

    except Exception as e:
        print(f"ERRO CRÍTICO NA EXECUÇÃO DA FUNÇÃO: {e}")
        return https_fn.Response(json.dumps({"error": "Desculpe, ocorreu um erro interno ao processar sua solicitação com a IA."}), status=500, headers={"Content-Type": "application/json"})