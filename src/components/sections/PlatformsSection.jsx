import { ExternalLink, Linkedin, Github, Globe, Youtube, Briefcase } from 'lucide-react'

const PlatformsSection = () => {
  const platforms = [
    {
      title: "LinkedIn",
      description: "Conecte-se comigo para networking profissional.",
      url: "https://www.linkedin.com/in/manuelportelaneto/",
      icon: Linkedin,
      gradient: "from-blue-600 to-blue-500",
      stats: "200+ Conexões"
    },
    {
      title: "GitHub",
      description: "Explore meu código-fonte e contribuições.",
      url: "https://github.com/manuelportelaneto",
      icon: Github,
      gradient: "from-gray-700 to-gray-600",
      stats: "50+ Repositórios"
    },
    {
      title: "Upwork",
      description: "Veja meu histórico de sucesso e me contrate.",
      url: "https://www.upwork.com/freelancers/~01ccf5e1820f05697e",
      icon: Briefcase,
      gradient: "from-green-600 to-green-500",
      stats: "Top Rated Freelancer"
    },
    {
      title: "Google for Developers",
      description: "Confira minhas conquistas no ecossistema Google.",
      url: "https://g.dev/manuelportela",
      icon: Globe,
      gradient: "from-orange-500 to-red-500",
      stats: "Google Developer"
    },
    //{
    //title: "Cloud Matrix",
    //description: "Conheça minha empresa de desenvolvimento.",
    //url: "https://cloudmatrix.com.br/",
    //icon: Globe,
    //gradient: "from-purple-600 to-purple-500",
    //stats: "Empresa Própria"
    //},
    {
      title: "YouTube",
      description: "Acompanhe meu conteúdo sobre IA.",
      url: "https://www.youtube.com/@aisim.101",
      icon: Youtube,
      gradient: "from-red-600 to-red-500",
      stats: "Canal Educativo"
    }
  ]

  const PlatformCard = ({ platform }) => {
    const IconComponent = platform.icon

    return (
      <a
        href={platform.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block card group hover:transform hover:scale-105 transition-all duration-500 cursor-pointer"
      >
        {/* Icon Header */}
        <div className="flex items-center justify-center mb-6">
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${platform.gradient} p-4 group-hover:shadow-lg group-hover:shadow-primary-500/25 transition-all duration-300`}>
            <IconComponent className="w-full h-full text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
            {platform.title}
          </h3>

          <p className="text-gray-400 mb-4 leading-relaxed">
            {platform.description}
          </p>

          {/* Stats Badge */}
          <div className="mb-4">
            <span className={`inline-block px-3 py-1 bg-gradient-to-r ${platform.gradient} text-white text-xs font-medium rounded-full`}>
              {platform.stats}
            </span>
          </div>

          {/* Call to Action */}
          <div className="flex items-center justify-center gap-2 text-primary-400 group-hover:text-primary-300 transition-colors">
            <span className="text-sm font-medium">Visitar</span>
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </a>
    )
  }

  return (
    <section id="platforms" className="py-20 bg-gray-950">
      <div className="container mx-auto px-6">
        <h2 className="section-title">Explore Meu Trabalho</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {platforms.map((platform, index) => (
            <PlatformCard key={index} platform={platform} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-primary-500/10 to-purple-500/10 border border-primary-500/20 rounded-xl">
            <Globe className="w-12 h-12 text-primary-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Vamos Nos Conectar?
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Estou presente em várias plataformas digitais compartilhando conhecimento, construindo projetos e conectando com profissionais da área. Escolha sua plataforma favorita e vamos conversar!
            </p>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://www.linkedin.com/in/manuelportelaneto/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href="https://github.com/manuelportelaneto"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://www.upwork.com/freelancers/~01ccf5e1820f05697e"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                <Briefcase className="w-4 h-4" />
                Contratar
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PlatformsSection
