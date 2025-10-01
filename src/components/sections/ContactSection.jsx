import React, { useState } from 'react'
import { Mail, Phone, Linkedin, Copy, MessageCircle, Users, Heart } from 'lucide-react'

const ContactSection = () => {
  const [copiedEmail, setCopiedEmail] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('manuelpn@live.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const contactMethods = [
    {
      title: "Email",
      value: "manuelportela@cloudmatrix.com.br",
      description: "Respondo em até 24 horas",
      icon: Mail,
      action: copyEmail,
      actionText: copiedEmail ? "Copiado!" : "Copiar Email",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "WhatsApp", 
      value: "+55 11 92006 5300",
      description: "Conversas rápidas e diretas",
      icon: MessageCircle,
      action: () => window.open('https://wa.me/5511920065300', '_blank'),
      actionText: "Abrir Chat",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "LinkedIn",
      value: "manuelportelaneto",
      description: "Networking profissional",
      icon: Linkedin,
      action: () => window.open('https://www.linkedin.com/in/manuelportelaneto/', '_blank'),
      actionText: "Conectar",
      gradient: "from-blue-600 to-blue-500"
    }
  ]

  const ContactCard = ({ contact }) => {
    const IconComponent = contact.icon

    return (
      <div className="card group hover:transform hover:scale-105 transition-all duration-500">
        {/* Icon Header */}
        <div className="flex items-center justify-center mb-6">
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${contact.gradient} p-4 group-hover:shadow-lg group-hover:shadow-primary-500/25 transition-all duration-300`}>
            <IconComponent className="w-full h-full text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
            {contact.title}
          </h3>

          <p className="text-primary-400 font-mono text-lg mb-2">
            {contact.value}
          </p>

          <p className="text-gray-400 mb-6 text-sm">
            {contact.description}
          </p>

          <button
            onClick={contact.action}
            className={`w-full py-3 px-4 bg-gradient-to-r ${contact.gradient} text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
          >
            {contact.actionText}
          </button>
        </div>
      </div>
    )
  }

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Partners Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Parceiros e Colaboradores
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Acredito que as melhores soluções nascem da colaboração.
            </p>
          </div>

          {/* Partners Placeholder */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-primary-500/10 to-purple-500/10 border border-primary-500/20 rounded-xl p-12 text-center">
              <Users className="w-16 h-16 text-primary-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">
                Construindo Parcerias Sólidas
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Trabalho lado a lado com empresas, desenvolvedores e especialistas para criar soluções inovadoras. Cada projeto é uma oportunidade de aprender e crescer juntos.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50">
                {/* Placeholder para logos de parceiros */}
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-12 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700">
                    <span className="text-gray-500 text-sm">Logo {i}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 text-sm mt-6">
                Logos dos parceiros serão adicionados em breve
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Vamos Conversar?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Estou sempre aberto a novas oportunidades, projetos desafiadores e parcerias. Sinta-se à vontade para entrar em contato.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto break-all">
            {contactMethods.map((contact, index) => (
              <ContactCard key={index} contact={contact} />
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-primary-500/10 to-purple-500/10 border border-primary-500/20 rounded-xl">
              <Heart className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">
                Vamos Criar Juntos!
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Seja para discutir um projeto, trocar ideias sobre tecnologia ou simplesmente fazer networking, estou sempre disponível para uma boa conversa. Acredito no poder da colaboração e no compartilhamento de conhecimento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
