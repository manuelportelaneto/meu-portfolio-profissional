import React from 'react'
import { CheckCircle, User, Target, Lightbulb, BrainCircuit, Cloud } from 'lucide-react'
import { Tooltip } from 'react-tooltip' // PASSO 1: Importar o Tooltip

const AboutSection = () => {
  // PASSO 2: Transformar a lista de skills em objetos com descrição
  const softSkills = [
    { name: 'Polimata', id: 'polymath', description: 'Capacidade de adquirir conhecimento em diversas áreas distintas, conectando ideias e aplicando soluções criativas.' },
    { name: 'Autodidata', id: 'autodidact', description: 'Habilidade de aprender de forma independente e contínua, buscando ativamente novos conhecimentos e tecnologias.' },
    { name: 'Comunicação Eficaz', id: 'comms', description: 'Capacidade de transmitir ideias complexas de forma clara e objetiva, tanto para públicos técnicos quanto não-técnicos.' },
    { name: 'Resolução de Problemas', id: 'problem-solving', description: 'Mentalidade analítica para decompor desafios complexos, identificar a causa raiz e implementar soluções eficientes.' },
    { name: 'Adaptabilidade', id: 'adaptability', description: 'Facilidade em se ajustar a novas tecnologias, metodologias e ambientes de trabalho, mantendo a produtividade.' },
    { name: 'Otimização de Processos', id: 'optimization', description: 'Visão crítica para identificar gargalos e ineficiências, aplicando tecnologia para automatizar e melhorar fluxos de trabalho.' }
  ]

  return (
    <section id="about" className="py-20 bg-gray-950">
      <div className="container mx-auto px-6">
        <h2 className="section-title">Minha Trajetória</h2>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg prose-invert max-w-none">
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-xl">
                  Com um background de mais de 6 anos otimizando operações complexas na logística, minha entrada na tecnologia foi uma progressão natural. Eu não aprendi a programar para criar software; aprendi a programar para <span className="text-primary-400 font-medium">resolver problemas de negócio em escala</span>.
                </p>

                <p className="text-xl">
                  Hoje, como Arquiteto de Soluções, aplico essa mentalidade analítica e pragmática para projetar e construir sistemas de ponta a ponta. Minha especialidade é o ecossistema moderno: <span className="text-primary-400 font-medium">IA Generativa (OpenAI, Gemini, Claude, RAG, MCP), Automação de Processos (n8n)</span> e a infraestrutura <span className="text-primary-400 font-medium">Multicloud (AWS, Azure, GCP, OCI)</span> que os sustenta.
                </p>

                <p className="text-xl">
                  Da ideação de um agente de IA à sua implantação em um cluster <span className="text-primary-400 font-medium">Kubernetes</span> via pipelines de <span className="text-primary-400 font-medium">CI/CD</span>, meu foco é o ciclo de vida completo. A tecnologia é a ferramenta, <span className="text-primary-400 font-medium">resultados tangíveis são o que eu entrego.</span>
                </p>
              </div>

              {/* Experience Highlights */}
              <div className="mt-12 grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gray-900 rounded-xl border border-gray-800"><Cloud className="w-8 h-8 text-primary-500 mx-auto mb-3" /><h3 className="text-2xl font-bold text-white mb-2">4</h3><p className="text-gray-400">Nuvens (AWS, Azure, GCP, OCI)</p></div>
                <div className="text-center p-6 bg-gray-900 rounded-xl border border-gray-800"><BrainCircuit className="w-8 h-8 text-primary-500 mx-auto mb-3" /><h3 className="text-2xl font-bold text-white mb-2">10+</h3><p className="text-gray-400">Projetos com IA</p></div>
                <div className="text-center p-6 bg-gray-900 rounded-xl border border-gray-800"><Lightbulb className="w-8 h-8 text-primary-500 mx-auto mb-3" /><h3 className="text-2xl font-bold text-white mb-2">24/7</h3><p className="text-gray-400">Aprendizado Contínuo</p></div>
              </div>
            </div>
          </div>

          {/* Soft Skills Box */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <h3 className="text-2xl font-bold text-primary-400 mb-6 flex items-center gap-3"><CheckCircle className="w-7 h-7" />Soft Skills</h3>
              <div className="space-y-4">
                {softSkills.map((skill) => (
                  // PASSO 3: Adicionar os atributos data-* para conectar com o Tooltip
                  <div
                    key={skill.id}
                    data-tooltip-id="soft-skill-tooltip"
                    data-tooltip-content={skill.description}
                    className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300"
                  >
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-gray-200 font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
              <blockquote className="mt-8 p-4 bg-primary-500/10 border-l-4 border-primary-500 rounded"><p className="text-gray-300 italic">&quot;A melhor tecnologia é aquela que resolve problemas reais e cria valor mensurável.&quot;</p><footer className="text-primary-400 font-medium mt-2">— Manuel Portela</footer></blockquote>
            </div>
          </div>
        </div>

        {/* PASSO 4: Renderizar e Estilizar o Componente Tooltip */}
        <Tooltip id="soft-skill-tooltip"
          place="top-start"
          style={{
            backgroundColor: 'var(--color-gray-700, #374151)', // Cor de fundo do seu design
            color: '#D1D5DB', // Cor do texto
            borderRadius: '8px',
            maxWidth: '250px',
            fontSize: '12px',
            lineHeight: '1.5',
            padding: '8px 12px',
            zIndex: '99',
          }}
        />
      </div>
    </section>
  )
}

export default AboutSection