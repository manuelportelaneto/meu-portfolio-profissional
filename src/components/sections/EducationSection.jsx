import { Award, GraduationCap, BookOpen, Star } from 'lucide-react'

const EducationSection = () => {
  const certifications = [
    {
      category: "Multicloud, DevOps & IA",
      items: [
        "Certificado Multicloud DevOps & IA",
        "Fundamentos de DevOps",
        "Certificados Azure e Cloud (DIO)"
      ],
      icon: Award,
      color: "from-blue-500 to-cyan-500"
    },
    {
      category: "Inteligência Artificial",
      items: [
        "Fundamentos de IA (DIO)",
        "IA Generativa",
        "Processamento de Linguagem Natural",
        "Visão Computacional"
      ],
      icon: Star,
      color: "from-purple-500 to-pink-500"
    },
    {
      category: "Análise de Dados",
      items: [
        "Power BI (Fundação Bradesco)",
        "Análise de Dados",
        "Business Intelligence"
      ],
      icon: BookOpen,
      color: "from-green-500 to-emerald-500"
    }
  ]

  const education = [
    {
      title: "Curso Superior de Tecnologia (CST)",
      subtitle: "Análise e Desenvolvimento de Sistemas",
      institution: "UNINTER",
      status: "Cursando",
      period: "2023 - 2027",
      type: "graduation"
    },
    {
      title: "Curso Técnico Integrado",
      subtitle: "Desenvolvedor Full-Stack",
      institution: "Mimo",
      status: "Cursando",
      period: "2024 - 2025",
      type: "technical"
    }
  ]

  return (
    <section id="education" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="section-title">Certificações e Educação</h2>

        <div className="max-w-7xl mx-auto">
          {/* Certificações */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Certificações Profissionais</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {certifications.map((cert, index) => {
                const IconComponent = cert.icon
                return (
                  <div key={index} className="card group hover:transform hover:scale-105 transition-all duration-500">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${cert.color} p-2.5 group-hover:shadow-lg group-hover:shadow-primary-500/25 transition-all duration-300`}>
                        <IconComponent className="w-full h-full text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors">
                        {cert.category}
                      </h4>
                    </div>

                    {/* Certificações */}
                    <div className="space-y-3">
                      {cert.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${cert.color} mt-2 flex-shrink-0`}></div>
                          <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Progress Badge */}
                    <div className="mt-6 pt-4 border-t border-gray-800">
                      <div className="flex justify-center">
                        <span className={`px-3 py-1 bg-gradient-to-r ${cert.color} text-white text-xs font-medium rounded-full`}>
                          Certificado
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Formação Acadêmica */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Formação Acadêmica</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {education.map((edu, index) => (
                <div key={index} className="card group hover:transform hover:scale-105 transition-all duration-500">
                  {/* Education Icon */}
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-primary-500/25 transition-all duration-300">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {edu.title}
                    </h4>
                    <p className="text-primary-400 font-medium mb-2">
                      {edu.subtitle}
                    </p>
                    <p className="text-gray-400 mb-3">
                      {edu.institution}
                    </p>
                    <div className="flex justify-center gap-4 items-center">
                      <span className="text-gray-300 text-sm">
                        {edu.period}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${edu.status === 'Cursando'
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          : 'bg-green-500/20 text-green-400 border border-green-500/30'
                        }`}>
                        {edu.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Philosophy */}
          <div className="mt-16 text-center">
            <div className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-primary-500/10 to-purple-500/10 border border-primary-500/20 rounded-xl">
              <BookOpen className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Aprendizado Contínuo</h3>
              <p className="text-gray-300 leading-relaxed">
                Acredito que a educação é um processo contínuo. Mantenho-me constantemente atualizado com as últimas tecnologias e tendências do mercado através de cursos, certificações e projetos práticos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EducationSection
