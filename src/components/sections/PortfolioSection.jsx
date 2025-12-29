import React, { useState } from 'react' // Adicionado useState
import { ExternalLink, Github, Lock, Briefcase, Cloud, BookOpen, Layers, Code2, MessageCircle } from 'lucide-react'
import ProjectModal from '../ProjectModal'; // Importa nosso novo componente de modal
import ProjectGalleryModal from '../ProjectGalleryModal'; // NOVO: Importa o componente para a galeria

// Importações de imagens 
import imgVirtualMachines from '../../assets/projects/virtualmachines.png'; 
import imgEcommerce from '../../assets/projects/ecommerce.png';
import imgDonaAntonieta from '../../assets/projects/donaantonieta.png';
import imgAvozdoexu from '../../assets/projects/avozdoexu.png';
import imgPortfolioPreview from '../../assets/projects/portfolio.png';
import imgManuelBotPreview from '../../assets/projects/manuelbot.png';
import imgVpnGcp from '../../assets/projects/VpnGcp.png';
// Importações das imagens do projeto Cloud Mart
import imgCloudmart from '../../assets/projects/cloudmart.jpeg';
import imgA1 from '../../assets/projects/a01.jpeg';
import imgA2 from '../../assets/projects/a02.jpeg';
import imgA3 from '../../assets/projects/a03.jpeg';
import imgA4 from '../../assets/projects/a04.jpeg';
import imgA5 from '../../assets/projects/a05.jpeg';
import imgA6 from '../../assets/projects/a06.jpeg';
import imgA7 from '../../assets/projects/a07.jpeg';
import imgA8 from '../../assets/projects/a08.jpeg';
import imgA9 from '../../assets/projects/a09.jpeg';
import imgA10 from '../../assets/projects/a10.jpeg';
import imgA11 from '../../assets/projects/a11.jpeg';
import imgA12 from '../../assets/projects/a12.jpeg';
// Importações do Digital Nexus
import imgGrafanaFinal from '../../assets/projects/digitalnexus/grafana-final.jpeg';
import imgTerraformAws from '../../assets/projects/digitalnexus/terraform-aws.png';
import imgTerraformGcp from '../../assets/projects/digitalnexus/terraform-gcp.png';
import imgDynamoDB from '../../assets/projects/digitalnexus/dynamodb-data.png';
import imgApiReaderCode from '../../assets/projects/digitalnexus/api-reader-code.png';

const PortfolioSection = ({ openChat }) => {
  // Estado para controlar a visibilidade do modal e o projeto selecionado
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  //Novo state para a galeria
  const [isGalleryOpen, setIsGalleryOpen] = useState(false); 
  
  // Função que abre a galeria e define o projeto (Chamado por "Ver Projeto")
  const openGalleryModal = (project) => {
      setSelectedProject(project);
      setIsGalleryOpen(true);
  };
  
  const closeGalleryModal = () => {
      setIsGalleryOpen(false);
      setSelectedProject(null);
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const projects = [
    {
    title: "CloudMart - E-commerce com IA e Multicloud",
    description: "E-commerce totalmente funcional (Fullstack, IA e DevOps) demonstrando a implementação de microsserviços em arquitetura Multicloud (AWS, Azure, GCP).",
    image: imgCloudmart, // imgCloudmart deve ser a imagem de Capa (Front-end E-commerce com Chatbot AI)
    tags: ["AWS", "Azure", "GCP", "Kubernetes", "EKS", "DynamoDB", "BigQuery", "React", "Node.js", "AI/GenAI"],
    links: [
        { label: "Ver Projeto (Galeria)", isGalleryButton: true, icon: Cloud },  
        // ALTERAÇÃO CRÍTICA: Botão do GitHub AGORA ATIVO para verificação de código!
        { label: "Ver Código no GitHub", url: "https://github.com/manuelportelaneto/cloudmart", icon: Github, restricted: false } 
    ],
    gradient: "from-fuchsia-500 to-red-500", 
    featured: true, 
    problem: "Criar uma plataforma de e-commerce escalável de próxima geração (next-gen) que unisse microsserviços (Kubernetes), análise de dados (GCP BigQuery), gerenciamento de clientes com suporte IA e rastreamento de infraestrutura em múltiplos provedores Cloud, mantendo o full stack expertise.",
    skillsUsed: "Implementação completa de microsserviços em EKS, arquitetura Multicloud com serviços nativos (AWS CodePipeline/DynamoDB e GCP BigQuery/Azure Deployment), uso de Machine Learning e Análise de Sentimento em tickets de suporte para obter customer insights, e deploy CI/CD automatizado via Pipeline as Code.",
    galleryImages: [
        { 
            image: imgCloudmart, // 0 - CAPA: Main Products + Chatbot AI
            caption: "Front-end E-commerce: Interface principal com integração ao AI Assistant (Chatbot), demonstrando o núcleo da aplicação. (Fullstack/IA)" 
        },
        { 
            image: imgA1, // 1 - Your Cart
            caption: "Console Principal da AWS: Visão de alto nível (Overview) dos serviços fundamentais utilizados: EKS, IAM, CodePipeline e DynamoDB. (AWS Infra Overview)" 
        },
        { 
            image: imgA2, // 2 - AWS Console Overview
            caption: "Ambiente do Google BigQuery (GCP): Configuração da Camada de Análise de Dados (Data Warehouse) centralizando dados para Business Intelligence. (Multicloud/Data Analytics)" 
        },
        { 
            image: imgA3, // 3 - GCP BigQuery
            caption: "Painel do AWS CodeBuild: Projetos de compilação ativos. Prova da infraestrutura de Continuous Integration (CI). (DevOps/CI)" 
        },
        { 
            image: imgA4, // 4 - AWS CodeBuild
            caption: "Pipeline de Entrega Contínua (CI/CD) com status de sucesso no deploy. A espinha dorsal da entrega automatizada. (DevOps/CD)" 
        },
        { 
            image: imgA5, // 5 - AWS CodePipeline
            caption: "Gerenciamento de Instâncias EC2: Máquinas virtuais que hospedam os nós de SysAdmin e Workstation que se comunicam com o EKS. (AWS/IaaS)" 
        },
        { 
            image: imgA6, // 6 - AWS EC2 Instances
            caption: "Visão do DynamoDB (AWS): O banco de dados NoSQL para as tabelas transacionais críticas do e-commerce (Pedidos, Produtos). (AWS/Database)" 
        },
        { 
            image: imgA7, // 7 - AWS DynamoDB
            caption: "Função Serverless AWS Lambda: Diagrama de ETL (Extract, Transform, Load) que orquestra a movimentação de dados entre DynamoDB (AWS) e BigQuery (GCP). (Multicloud/Serverless)" 
        },
        { 
            image: imgA8, // 8 - AWS Lambda ETL
            caption: "Microsoft Azure: Confirmação de um Deployment (implantação) bem-sucedido. Um ativo visual essencial da arquitetura Multicloud. (Azure/Deployment)" 
        },
        { 
            image: imgA9, // 9 - Azure Deployment Success
            caption: "Gestão do Fluxo de Compras: Exibição da tela 'Your Cart' (*Carrinho de Compras*), um ponto crucial no User Flow. (E-commerce Core)" 
        },
        { 
            image: imgA10, // 10 - My Orders Screen
            caption: "Tela de Customer Support: Demonstração da interface de chat para interação e resolução de problemas, parte do Fullstack. (Front-end Core)"
        },
        { 
            image: imgA11, // 11 - Customer Support Chat
            caption: "Módulo My Orders: Visão do fluxo de pedidos e seus status (Pending, Cancelled). Confirmação de funcionamento dos microsserviços transacionais. (User Flow)" 
        },
        { 
            image: imgA12, // 12 - Support Tickets + Sentiment
            caption: "Análise de Tickets de Suporte: Tabela exibindo a classificação de Sentimento (Positive, Neutral, Negative) dos clientes, utilizando serviços de IA. (Inteligência Artificial/MLOps)" 
        },
    ]
    },
    {
      title: "Dental Management System",
      description: "Sistema completo de gestão para clínicas odontológicas, incluindo backend, painel de controle interativo e chatbot de agendamento.",
      videoUrl: 'https://www.youtube.com/embed/c0ccG3-5aPo',
      tags: ["Firebase", "HTML", "CSS", "JavaScript", "TailwindCSS", "Gemini 1.5", "BlackBox AI"],
      links: [
        { label: "Ver Projeto", url: "https://www.youtube.com/watch?v=c0ccG3-5aPo&t=412s", icon: ExternalLink },
        { label: "Acesso Restrito", url: "#", icon: Lock, restricted: true }
      ],
      gradient: "from-blue-500 to-purple-500",
      problem: "Clínicas odontológicas enfrentavam dificuldades com sistemas de agendamento desatualizados, resultando em alta taxa de 'no-shows' e sobrecarga de trabalho administrativo para a equipe da recepção.",
      skillsUsed: "Desenvolvimento de uma aplicação full-stack em tempo real com Firebase, uso avançado de TailwindCSS para interfaces complexas e aplicação de IAs generativas para acelerar o desenvolvimento de código e assets."
    },
    {
      title: "Desenvolvimento E-commerce",
      description: "Criação e gerenciamento de lojas virtuais responsivas e otimizadas para conversão.",
      image: imgEcommerce,
      tags: ["WordPress", "WooCommerce", "HTML", "CSS", "JavaScript", "Canva", "Leonardo AI"],
      links: [{ label: "Ver no Upwork", url: "https://www.upwork.com/freelancers/~01ccf5e1820f05697e?p=1852095935804694528", icon: ExternalLink }],
      gradient: "from-orange-500 to-red-500",
      problem: "Uma pequena empresa necessitava de uma presença online para vender seus produtos, mas não tinha o conhecimento técnico para criar uma loja virtual segura, responsiva e com gateways de pagamento integrados.",
      skillsUsed: "Implementação completa de plataformas de e-commerce com WooCommerce, desde a configuração de produtos e gateways de pagamento até a personalização do design para corresponder à identidade da marca do cliente."
    },
    {
      title: "Provisionamento de Recursos em Nuvem",
      description: "Criação de infraestrutura como serviço (IaaS) e provisionamento de máquinas virtuais, bancos de dados e serviços serverless nas principais clouds.",
      image: imgVirtualMachines,
      tags: ["Azure", "GCP", "AWS", "Terraform", "Kubernetes", "Cloud Run"],
      links: [{ label: "Perfil Google Dev", url: "https://developers.google.com/profile/u/manuelportela", icon: Code2 }],
      gradient: "from-indigo-500 to-blue-500",
      featured: true,
      problem: "Empresas necessitavam de uma maneira rápida e replicável para criar ambientes de desenvolvimento e produção em múltiplas nuvens, reduzindo o tempo de setup manual e o risco de erros de configuração.",
      skillsUsed: "Domínio de Infraestrutura como Código (IaC) com Terraform, orquestração de contêineres com Kubernetes e deployment em plataformas serverless como Cloud Run, aprimorando a capacidade de construir soluções escaláveis e resilientes."
    },
    {
      title: "Blog A Voz Do Exu",
      description: "Desenvolvimento e manutenção de blog imersivo para portal de notícias sobre cultura e religião, com foco em SEO e performance.",
      image: imgAvozdoexu,
    tags: ["WordPress", "Elementor", "HTML", "CSS", "Canva", "Leonardo AI"],
      links: [{ label: "Ver Blog", url: "https://avozdoexu.lovestoblog.com/", icon: BookOpen }],
      gradient: "from-gray-700 to-gray-900",
      problem: "O portal precisava de uma plataforma de conteúdo que fosse visualmente atraente e imersiva, criando um ambiente temático para os visitantes. Neste projeto, criei um blog completo utilizando WordPress e Elementor, e criei uma landing page personalizada para gerar vendas",
      skillsUsed: "Customização avançada de temas WordPress com Elementor, técnicas de otimização de performance (PageSpeed) e implementação de melhores práticas de SEO On-Page para maximizar a visibilidade orgânica."
    },
    {
      title: "Odonto Flow - Smart Scheduling",
      description: "Construção de fluxos de automação complexos com N8N para sistema de agendamentos automatizados.",
      videoUrl: 'https://www.youtube.com/embed/oUdMQ12mRAc',
      letter: "Matrix",
      tags: ["N8N", "APIs", "WebHooks", "JavaScript", "React", "CloudFlare", "VPS", "Ubuntu", "Gemini 2.5 PRO"],
      links: [
        { label: "Ver Projeto", url: "https://www.youtube.com/watch?v=oUdMQ12mRAc", icon: ExternalLink },
        { label: "Acesso Restrito", url: "#", icon: Lock, restricted: true }
      ],
      gradient: "from-green-500 to-teal-500",
      problem: "Processos de agendamento dependiam de trocas de e-mails e planilhas, causando erros, agendamentos duplos, consumiam tempo valioso da equipe, que poderia ser usado em tarefas de maior valor. Solucionando também falhas de comunicação devido a quedas de energia, pois a arquitetura do sistema é descentralizada e independente.",
      skillsUsed: "Construção de fluxos de automação complexos com N8N, integração de múltiplas APIs (Google Calendar, email, etc.), desenvolvimento de lógicas condicionais com JavaScript para criar um sistema de agendamento verdadeiramente autônomo, e VPS para hospedagem."
    },
    {
      title: "Digital Nexus - Plataforma de FinOps Multicloud",
      description: "Construção de uma plataforma serverless de Business Intelligence para unificar, processar e visualizar dados de custos de múltiplos provedores de nuvem (AWS e GCP).",
      image: imgGrafanaFinal,
      tags: ["FinOps", "DevOps", "Serverless", "IaC", "Multicloud", "AWS", "GCP", "Terraform", "DynamoDB", "API Gateway", "Lambda", "Grafana"],
      links: [
        // Se você tiver o repositório no GitHub, adicione o link aqui
        // { label: "Ver Código no GitHub", url: "SEU_LINK_AQUI", icon: Github },
        { label: "Ver Galeria", url: "#", icon: Layers, isGalleryButton: true, iconOnly: true },
      ],
      gradient: "from-sky-500 to-indigo-600",
      featured: true,
      problem: "Empresas que operam em multicloud enfrentam o desafio da visibilidade fragmentada de custos, dificultando a tomada de decisões financeiras estratégicas.",
      skillsUsed: "Arquitetura de sistemas distribuídos, engenharia de dados em pipelines ETL serverless, automação de infraestrutura cross-cloud com Terraform e criação de dashboards de BI interativos.",
      galleryImages: [
        {
          image: imgTerraformAws, // Nome da imagem 3
          caption: "IaC - AWS: Trecho de código Terraform responsável por provisionar a infraestrutura do coletor AWS, incluindo a função Lambda, IAM Role e o trigger do EventBridge."
        },
        {
          image: imgTerraformGcp, // Nome da imagem 4
          caption: "IaC - GCP: Código Terraform provisionando a infraestrutura no GCP, incluindo a Cloud Function, Service Account e o Cloud Scheduler."
        },
        {
          image: imgDynamoDB, // Nome da imagem 5
          caption: "DATA LAKE: Console do DynamoDB exibindo os dados de custo já unificados e no formato granular, com registros de ambos os provedores (AWS e GCP)."
        },
        {
          image: imgApiReaderCode, // Nome da imagem 6
          caption: "API DE SERVIÇO: Código-fonte da Lambda (api_reader.py), responsável por ler os dados do DynamoDB e servi-los para o Grafana de forma otimizada."
        },
        {
          image: imgGrafanaFinal, // Nome da imagem 1
          caption: "PAINEL FINAL: Dashboard de BI em Grafana, consolidando dados da AWS e GCP em uma visão única e interativa, com KPIs e gráficos históricos."
        }
      ]
    },
    {
      title: "Site Institucional - Dona Antonieta",
      description: "Landing page e site institucional para artista, com foco em design limpo e experiência do usuário.",
      image: imgDonaAntonieta,
      tags: ["HTML", "CSS", "JavaScript", "SEO", "Clarity", "Google Analytics"],
      links: [
        { label: "Ver Site", url: "https://donaantonieta.cloudmatrix.com.br", icon: ExternalLink },
        { label: "Ver Código no GitHub", url: "https://github.com/manuelportelaneto", icon: Github }
      ],
      gradient: "from-pink-500 to-rose-500",
      problem: "Um artista teatral precisava de um espaço digital para exibir seu portfólio de forma elegante e profissional, que fosse fácil de navegar e que transmitisse a essência do seu trabalho artístico, com SEO otimizado para atrair mais visitantes, e ferramentas analíticas para monitorar o desempenho do site.",
      skillsUsed: "Foco nos fundamentos do desenvolvimento web (HTML, CSS e Javascript sem frameworks) para criar um site leve e performático. Habilidade em traduzir uma visão artística em um design web funcional e esteticamente agradável. Otimização de SEO e implementação de ferramentas analíticas para insights sobre o comportamento dos visitantes."
    },
    {
      title: "Portfólio Profissional (Esta Página)",
      description: "Desenvolvimento de uma Single-Page Application (SPA) com React e Vite para servir como um hub central de apresentação profissional, com foco em design moderno e experiência de usuário.",
      image: imgPortfolioPreview, 
      tags: ["React", "Vite", "Tailwind CSS", "Headless UI", "Framer Motion", "CI/CD", "Clarity", "GA4"],
      links: [
        { label: "Ver Código no GitHub", url: "https://github.com/manuelportelaneto/meu-portfolio-profissional", icon: Github }
      ],
      gradient: "from-cyan-500 to-blue-500",
      problem: "A necessidade de consolidar minhas habilidades, projetos e experiências em uma plataforma única, interativa e profissional, que fosse visualmente atraente para recrutadores e otimizada para SEO.",
      skillsUsed: "Aprofundamento em React Hooks, componentização, estilização com Tailwind CSS, implementação de animações com Framer Motion, e configuração de um pipeline de CI/CD completo com GitHub Actions para automação do deploy."
    },
    {
      title: "Manuel (bot) - Assistente Virtual com IA",
      description: "Implementação de um Agente de IA com arquitetura baseada em RAG. Criação de um backend serverless em Node.js, assistente de IA conversacional (desta página) e integração com APIs.",
      image: imgManuelBotPreview, 
      tags: ["Node.js", "Express", "OpenAI Assistants API", "Serverless", "Render.com", "Engenharia de Prompt"],
      links: [
        { label: "Ver Código no GitHub", url: "https://github.com/manuelportelaneto/manuel-bot-backend", icon: Github },
        { label: "Interagir com o Bot", url: "#", icon: MessageCircle }  
      ],
      gradient: "from-purple-500 to-indigo-500",
      problem: "Transformar um portfólio estático em uma experiência interativa e 'viva', capaz de responder perguntas dos visitantes 24/7, qualificar leads (recrutadores/clientes) e demonstrar minhas habilidades de IA na prática.",
      skillsUsed: "Arquitetura de microsserviços, desenvolvimento de API REST com Node.js/Express, orquestração de conversas com a OpenAI Assistants API, engenharia de prompt para refino de persona, e deploy de aplicações serverless na nuvem."
    },
    {
      title: "VPN Privada com WireGuard no GCP",
      description: "Desenvolvimento de uma solução de VPN pessoal e segura, hospedada no Google Cloud Platform, utilizando o protocolo moderno e performático WireGuard.",
      image: imgVpnGcp, // Substitua pelo nome da sua imagem importada
      tags: ["GCP", "Compute Engine", "Linux", "Networking", "Firewall Rules", "WireGuard", "Segurança", "IaaS"],
      links: [
        { label: "Ver Arquitetura", icon: Layers, isGalleryButton: true }
      ],
      gradient: "from-blue-600 to-teal-500",
      featured: false, // Defina como 'true' se quiser que ocupe mais espaço no grid
      problem: "A necessidade de garantir privacidade e segurança na navegação em redes Wi-Fi públicas e contornar restrições geográficas, evitando a dependência e os logs de serviços de VPN comerciais.",
      skillsUsed: "Provisionamento de IaaS na GCP (Compute Engine), configuração avançada de Firewall Rules para liberar portas UDP, administração de sistemas Linux (Ubuntu) via SSH, e a implementação completa de um servidor WireGuard para criar um túnel de comunicação criptografado e seguro.",
      galleryImages: [
        { 
          image: imgVpnGcp, // Use a mesma variável de importação do diagrama aqui
          caption: "Diagrama de arquitetura da solução de VPN privada no Google Cloud Platform, ilustrando o fluxo de tráfego seguro através do túnel WireGuard." 
        }
      ]
    },
  ];

  const ProjectCard = ({ project, onCardClick }) => (
    <div className={`card group ${project.featured ? 'md:col-span-2' : ''} hover:transform hover:scale-[1.02] transition-all duration-500`}>
      <div className="mb-6">
        <button onClick={() => onCardClick(project)} className="w-full text-left focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg">
          <div className={`w-full h-48 ${project.featured ? 'md:h-64' : ''} bg-gradient-to-br ${project.gradient} rounded-lg mb-4 flex items-center justify-center relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/30"></div>
            {project.videoUrl ? (
              <div className="absolute inset-0 w-full h-full pointer-events-none">
                <iframe src={project.videoUrl} title={project.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" ></iframe>
              </div>
            ) : project.image ? (
              <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            ) : (
              <div className="text-white text-3xl font-bold z-10 opacity-80">{project.letter || project.title.charAt(0)}</div>
            )}
            {project.featured && (
              <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium z-10">Destaque</div>
            )}
          </div>
        </button>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">{project.title}</h3>
        <p className="text-gray-400 leading-relaxed">{project.description}</p>
      </div>
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, tagIndex) => (<span key={tagIndex} className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-xs text-gray-300 hover:border-primary-500 hover:text-primary-400 transition-all duration-300">{tag}</span>))}
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        {project.links.map((link, linkIndex) => {
          const IconComponent = link.icon;

          if (link.label === "Interagir com o Bot") {
            return (
              <button
                key={linkIndex}
                onClick={openChat}
                className="btn-secondary inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium"
              >
                <IconComponent className="w-4 h-4" />
                {link.label}
              </button>
            );
          } 
          else if (link.isGalleryButton) {
            return (
              <button
                key={linkIndex}
                onClick={() => openGalleryModal(project)} // Chama a função para abrir o NOVO MODAL
                className="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium"
              >
                <IconComponent className="w-4 h-4" />
                {link.label}
              </button>
            );
          }
          
          return (
            <a
              key={linkIndex}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${link.restricted ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'btn-primary bg-primary-600 hover:bg-primary-700'}`}
              onClick={link.restricted ? (e) => e.preventDefault() : undefined}
            >
              <IconComponent className="w-4 h-4" />
              {link.label}
            </a>
          );
        })}
      </div>
    </div>
  );

  return (
    <section id="portfolio" className="py-20 bg-gray-950">
      <div className="container mx-auto px-6">
        <h2 className="section-title">Projetos em Destaque</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} onCardClick={openModal} />
          ))}
        </div>
        <div className="text-center mt-16">
          <div className="p-8 bg-gradient-to-r from-primary-500/10 to-purple-500/10 border border-primary-500/20 rounded-xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Interessado em colaborar?</h3>
            <p className="text-gray-300 mb-6">Estou sempre aberto a novos projetos e desafios. Vamos criar algo incrível juntos!</p>
            <a href="https://www.upwork.com/freelancers/~01ccf5e1820f05697e" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2"><ExternalLink className="w-5 h-5" />Contratar no Upwork</a>
          </div>
        </div>
      </div>
      <ProjectModal isOpen={isModalOpen} onClose={closeModal} project={selectedProject} />
      <ProjectGalleryModal isOpen={isGalleryOpen} onClose={closeGalleryModal} project={selectedProject} />
    </section>
  )
}
export default PortfolioSection