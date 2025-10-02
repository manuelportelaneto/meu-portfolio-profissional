import React from 'react'
import { ExternalLink, Github, Lock, Briefcase, Cloud, BookOpen, Layers, Code2 } from 'lucide-react'

// Passo 1: Importamos todas as suas imagens de projetos
import imgVirtualMachines from '../../assets/projects/virtualmachines.png'; 
import imgCloudMart from '../../assets/projects/cloudmart.jpeg';
import imgEcommerce from '../../assets/projects/ecommerce.png';
import imgDonaAntonieta from '../../assets/projects/donaantonieta.png';
import imgAvozdoexu from '../../assets/projects/avozdoexu.png';


const PortfolioSection = () => {
  // Passo 2: Atualizamos e expandimos a lista de projetos com as novas mídias e correções
  const projects = [
    // ======================================================================
    {
      title: "Provisionamento de Recursos em Nuvem",
      description: "Criação de infraestrutura como serviço (IaaS) e provisionamento de máquinas virtuais, bancos de dados e serviços serverless nas principais clouds.",
      image: imgVirtualMachines, 
      letter: "Cloud",
      tags: ["Azure", "GCP", "AWS", "Terraform", "Kubernetes", "Cloud Run"],
      links: [
        { label: "Perfil Google Dev", url: "https://developers.google.com/profile/u/manuelportela", icon: Code2 }
      ],
      gradient: "from-indigo-500 to-blue-500",
      featured: true // Agora este é o destaque
    },
    // ======================================================================
    {
      title: "Dental Management System",
      description: "Sistema completo de gestão e automação para clínicas odontológicas, incluindo backend, painel de controle interativo e página do cliente com calendário de agendamentos e atendimento com chatbot.",
      image: null, 
      videoUrl: 'https://www.youtube.com/embed/c0ccG3-5aPo',
      tags: ["Firebase", "HTML", "CSS", "JavaScript", "TailwindCSS", "Gemini 1.5", "BlackBox AI"],
      links: [
        { label: "Ver Projeto", url: "https://www.youtube.com/watch?v=c0ccG3-5aPo&t=412s", icon: ExternalLink },
        { label: "Acesso Restrito", url: "#", icon: Lock, restricted: true }
      ],
      gradient: "from-blue-500 to-purple-500",
    },
    {
      title: "Blog A Voz Do Exu",
      description: "Desenvolvimento e manutenção de blog imersivo para portal de notícias sobre cultura e religião, com foco em SEO e performance.",
      image: imgAvozdoexu,
      tags: ["WordPress", "Elementor", "HTML", "CSS"],
      links: [
        { label: "Ver Blog", url: "https://www.upwork.com/freelancers/~01ccf5e1820f05697e?p=1848020366048870400", icon: BookOpen }
      ],
      gradient: "from-gray-700 to-gray-900",
    },
    {
      title: "OdontoFlow - Smart Scheduling",
      description: "Solução de automação para agendamento inteligente, otimizando a alocação de recursos e horários com base em regras de negócio.",
      image: null, 
      videoUrl: 'https://www.youtube.com/embed/oUdMQ12mRAc',
      letter: "Matrix",
      tags: ["N8N", "APIs", "WebHooks", "JavaScript", "React", "CloudFlare"],
      links: [
        { label: "Ver Projeto", url: "https://www.youtube.com/watch?v=oUdMQ12mRAc", icon: ExternalLink },
        { label: "Acesso Restrito", url: "#", icon: Lock, restricted: true }
      ],
      gradient: "from-green-500 to-teal-500"
    },
    {
      title: "Desenvolvimento E-commerce",
      description: "Criação e gerenciamento de lojas virtuais responsivas e otimizadas para conversão.",
      image: imgEcommerce,
      tags: ["WordPress", "WooCommerce", "HTML", "CSS", "JavaScript"],
      links: [
        { label: "Ver no Upwork", url: "https://www.upwork.com/freelancers/~01ccf5e1820f05697e?p=1852095935804694528", icon: ExternalLink }
      ],
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Site Institucional - Dona Antonieta",
      description: "Landing page e site institucional para artista, com foco em design limpo e experiência do usuário.",
      image: imgDonaAntonieta,
      tags: ["HTML", "CSS", "JavaScript"],
      links: [
        { label: "Ver Site", url: "https://donaantonieta.cloudmatrix.com.br", icon: ExternalLink },
        { label: "Ver Código no GitHub", url: "https://github.com/manuelportelaneto", icon: Github }
      ],
      gradient: "from-pink-500 to-rose-500"
    }
  ]

  const ProjectCard = ({ project }) => (
    <div className={`card group ${project.featured ? 'md:col-span-2' : ''} hover:transform hover:scale-[1.02] transition-all duration-500`}>
      {/* Project Header - AGORA EXIBE A MÍDIA CORRETA (VÍDEO > IMAGEM > TEXTO) */}
      <div className="mb-6">
        <div className={`w-full h-48 ${project.featured ? 'md:h-64' : ''} bg-gradient-to-br ${project.gradient} rounded-lg mb-4 flex items-center justify-center relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/30"></div>
          
          {/* Passo 3: Lógica aprimorada para exibir a mídia correta */}
          {project.videoUrl ? (
            <iframe
              src={project.videoUrl}
              title={project.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
          ) : project.image ? (
            <img 
              src={project.image} 
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="text-white text-3xl font-bold z-10 opacity-80">
              {project.letter || project.title.charAt(0)}
            </div>
          )}

          {project.featured && (
            <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
              Destaque
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Technologies */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, tagIndex) => (
            <span 
              key={tagIndex}
              className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-xs text-gray-300 hover:border-primary-500 hover:text-primary-400 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-3">
        {project.links.map((link, linkIndex) => {
          const IconComponent = link.icon
          return (
            <a
              key={linkIndex}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium
                ${link.restricted || link.comingSoon 
                  ? 'bg-gray-800 border border-gray-700 text-gray-400 cursor-not-allowed' 
                  : 'bg-primary-500 hover:bg-primary-600 text-white hover:transform hover:scale-105'
                }
              `}
              onClick={link.restricted || link.comingSoon ? (e) => e.preventDefault() : undefined}
            >
              <IconComponent className="w-4 h-4" />
              {link.label}
            </a>
          )
        })}
      </div>
    </div>
  )

  return (
    <section id="portfolio" className="py-20 bg-gray-950">
      <div className="container mx-auto px-6">
        <h2 className="section-title">Projetos em Destaque</h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="p-8 bg-gradient-to-r from-primary-500/10 to-purple-500/10 border border-primary-500/20 rounded-xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Interessado em colaborar?
            </h3>
            <p className="text-gray-300 mb-6">
              Estou sempre aberto a novos projetos e desafios. Vamos criar algo incrível juntos!
            </p>
            <a 
              href="https://www.upwork.com/freelancers/~01ccf5e1820f05697e"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              Contratar no Upwork
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PortfolioSection