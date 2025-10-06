import React from 'react'
import { CheckCircle, User, Target, Lightbulb } from 'lucide-react'
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
                  Minha jornada na tecnologia começou após mais de 6 anos solidificando minha carreira em logística e operações. Essa experiência me proporcionou uma visão única sobre a importância da eficiência, otimização e resolução de problemas complexos no mundo real.
                </p>

                <p>
                  Hoje, como <span className="text-primary-400 font-medium">Estudante de Análise e Desenvolvimento de Sistemas</span>, eu aplico essa mentalidade analítica para construir soluções de software robustas. Sou apaixonado por conectar o mundo dos negócios à tecnologia, utilizando Inteligência Artificial Generativa, Cloud Computing e ferramentas de automação como N8N para criar não apenas código, mas resultados tangíveis.
                </p>

                <p>
                  Seja desenvolvendo páginas web responsivas, administrando sistemas em nuvem ou criando conteúdo dinâmico com IA, meu foco é sempre o mesmo: <span className="text-primary-400 font-medium">entregar soluções inteligentes que fazem a diferença</span>.
                </p>
              </div>

              {/* Experience Highlights */}
              <div className="mt-12 grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gray-900 rounded-xl border border-gray-800"><User className="w-8 h-8 text-primary-500 mx-auto mb-3" /><h3 className="text-2xl font-bold text-white mb-2">6+</h3><p className="text-gray-400">Anos em Logística</p></div>
                <div className="text-center p-6 bg-gray-900 rounded-xl border border-gray-800"><Target className="w-8 h-8 text-primary-500 mx-auto mb-3" /><h3 className="text-2xl font-bold text-white mb-2">30+</h3><p className="text-gray-400">Projetos Entregues</p></div>
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
              <blockquote className="mt-8 p-4 bg-primary-500/10 border-l-4 border-primary-500 rounded"><p className="text-gray-300 italic">"A melhor tecnologia é aquela que resolve problemas reais e cria valor mensurável."</p><footer className="text-primary-400 font-medium mt-2">— Manuel Portela</footer></blockquote>
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