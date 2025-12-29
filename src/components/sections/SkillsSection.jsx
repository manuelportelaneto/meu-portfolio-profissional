import React from 'react'
import { Bot, Cloud, Code, BarChart3 } from 'lucide-react'

// Objeto para centralizar os estilos de proficiência
// Agora, para mudar a cor ou a largura de um nível, você só precisa editar aqui.
const proficiencyLevels = {
  Básico: {
    label: 'Básico',
    textColor: 'text-blue-400',
    width: '35%'
  },
  Intermediário: {
    label: 'Intermediário',
    textColor: 'text-yellow-400',
    width: '65%'
  },
  Avançado: {
    label: 'Avançado',
    textColor: 'text-primary-400',
    width: '85%'
  }
};

const SkillsSection = () => {
  // Adicionamos a chave "proficiency" a cada categoria
  const skillCategories = [
    {
      icon: Bot,
      title: "IA & Automação",
      skills: [
        "IA Generativa",
        "Engenharia de Prompt", 
        "N8N",
        "Python",
        "PLN",
        "Automação de Processos"
      ],
      gradient: "from-purple-500 to-pink-500",
      proficiency: "Avançado" // Nível original
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      skills: [
        "Google Cloud",
        "Microsoft Azure", 
        "Docker",
        "Servidores Linux",
        "CI/CD",
        "Scrum"
      ],
      gradient: "from-blue-500 to-cyan-500",
      proficiency: "Intermediário" // Nível ajustado
    },
    {
      icon: Code,
      title: "Desenvolvimento Web",
      skills: [
        "HTML",
        "CSS", 
        "JavaScript",
        "React",
        "Node.js",
        "SQL",
        "APIs REST",
        "Microsserviços"
      ],
      gradient: "from-green-500 to-emerald-500",
      proficiency: "Avançado" // Nível original
    },
    {
      icon: BarChart3,
      title: "Análise de Dados",
      skills: [
        "Power BI",
        "Excel Avançado",
        "Análise de Dados", 
        "Modelagem de Dados",
        "Business Intelligence",
        "Visualização"
      ],
      gradient: "from-orange-500 to-red-500",
      proficiency: "Básico" // Nível ajustado
    }
  ]

  return (
    <section id="skills" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="section-title">Principais Competências</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon
            // Buscamos o estilo correspondente ao nível da categoria atual
            const proficiencyStyle = proficiencyLevels[category.proficiency];

            return (
              <div 
                key={index}
                className="card group hover:transform hover:scale-105 transition-all duration-500"
              >
                {/* Icon Header */}
                <div className="flex flex-col items-center mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${category.gradient} p-3 mb-4 group-hover:shadow-lg group-hover:shadow-primary-500/25 transition-all duration-300`}>
                    <IconComponent className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white text-center">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div 
                      key={skillIndex}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.gradient}`}></div>
                      <span className="text-gray-300 text-sm font-medium">{skill}</span>
                    </div>
                  ))}
                </div>

                {/* Progress Indicator - Agora é dinâmico! */}
                <div className="mt-6 pt-4 border-t border-gray-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-400">Proficiência</span>
                    <span className={`text-xs ${proficiencyStyle.textColor} font-medium`}>{proficiencyStyle.label}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${category.gradient} animate-pulse`}
                      style={{ width: proficiencyStyle.width }}
                    ></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional Skills */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Outras Competências</h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              "WordPress", "WooCommerce", "Git", "GitHub", 
              "API Integration", "Database Design", "UI/UX", 
              "Agile Methodology", "Project Management", "Firebase", 
              "Cloudflare", "SEO", "Python", "Notion", "Figma", 
              "Canva", "ChatGPT", "Gemini", "BlackBox AI"
            ].map((skill, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-gray-300 hover:border-primary-500 hover:text-primary-400 transition-all duration-300 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection