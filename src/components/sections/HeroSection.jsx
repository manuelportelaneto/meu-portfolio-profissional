import { ChevronDown, Mail, Github, Linkedin } from 'lucide-react'
import profilePic from '../../assets/projects/manuelportela.png';

const HeroSection = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section id="hero" className="relative min-h-screen pt-24 md:pt-20 flex flex-col items-center justify-center text-center px-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-primary-600/10 rounded-full blur-xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Profile Image Placeholder */}
          <div className="mb-8 flex justify-center">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 p-1 animate-float">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                <img
                  src={profilePic}
                  alt="Manuel Portela Neto"
                  className="w-full h-full rounded-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            <span className="text-gradient">Manuel Portela Neto</span>
          </h1>

          <h2 className="text-xl md:text-2xl text-gray-300 mb-8 animate-slide-up delay-200">
            Arquiteto de Soluções & DevOps<br />
            IA Generativa | Multicloud | Automação de Processos
          </h2>

          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12 animate-slide-up delay-300">
            Transformo desafios de negócio em soluções de software inteligentes. Da otimização de processos na logística à arquitetura de sistemas Multicloud, minha missão é criar ecossistemas de IA e automação que geram valor de negócio real e mensurável.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up delay-500">
            <button
              onClick={() => scrollToSection('portfolio')}
              className="btn-primary inline-flex items-center gap-2"
            >
              Ver Projetos
              <ChevronDown className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Contato
            </button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-8 animate-slide-up delay-700">
            <a
              href="https://github.com/manuelportelaneto"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-primary-500 transition-all duration-300 hover:scale-110"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/manuelportelaneto/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-primary-500 transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
