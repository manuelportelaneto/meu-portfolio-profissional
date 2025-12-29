import React from 'react'
import { Heart, Code, Coffee, Github, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - About */}
          <div>
            <h3 className="text-xl font-bold text-gradient mb-4">Manuel Portela</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              Desenvolvedor de Sistemas especializado em Desenvolvimento Web, IA Generativa, Cloud e Automação. 
              Transformando ideias em soluções tecnológicas eficientes.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://github.com/manuelportelaneto"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-primary-500 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/manuelportelaneto/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-primary-500 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:manuelportela@cloudmatrix.com.br"
                className="p-2 bg-gray-800 rounded-lg hover:bg-primary-500 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Center Column - Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {[
                { label: 'Projetos', href: '#portfolio' },
                { label: 'Competências', href: '#skills' },
                { label: 'Sobre Mim', href: '#about' },
                { label: 'Contato', href: '#contact' }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contato</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-400">
                <Mail className="w-4 h-4 inline mr-2" />
                manuelportela@cloudmatrix.com.br
              </p>
              <p className="text-gray-400">
                📱 +55 11 92006 5300
              </p>
              <p className="text-gray-400">
                📍 São Paulo, Brasil
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm flex items-center gap-2">
              © {currentYear} Manuel Portela Neto. Feito com 
              <Heart className="w-4 h-4 text-red-500" />, 
              <Code className="w-4 h-4 text-primary-500" /> e 
              <Coffee className="w-4 h-4 text-yellow-500" />
            </p>

            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>React + Vite</span>
              <span>•</span>
              <span>Tailwind CSS</span>
              <span>•</span>
              <span>Lucide Icons</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
