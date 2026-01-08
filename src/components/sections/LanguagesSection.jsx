import { BookOpen, PenTool, Ear, MessageCircle } from 'lucide-react';

// Função auxiliar para obter os estilos de cor com base no nível
const getLevelStyles = (level) => {
  switch (level) {
    case 'Nativo':
      return 'text-yellow-400 font-bold';
    case 'Avançado':
      return 'text-green-400 font-semibold';
    case 'Intermediário':
      return 'text-blue-400 font-medium';
    case 'Básico':
      return 'text-gray-400';
    default:
      return 'text-gray-300';
  }
};

const languagesData = [
  {
    name: "Português (BR)",
    flag: "🇧🇷",
    levels: [
      { skill: "Leitura", level: "Nativo", icon: BookOpen },
      { skill: "Escrita", level: "Nativo", icon: PenTool },
      { skill: "Escuta", level: "Nativo", icon: Ear },
      { skill: "Fala", level: "Nativo", icon: MessageCircle },
    ]
  },
  {
    name: "Inglês",
    flag: "🇺🇸",
    levels: [
      { skill: "Leitura", level: "Intermediário", icon: BookOpen },
      { skill: "Escrita", level: "Intermediário", icon: PenTool },
      { skill: "Escuta", level: "Intermediário", icon: Ear },
      { skill: "Fala", level: "Básico", icon: MessageCircle },
    ]
  },
  {
    name: "Espanhol",
    flag: "🇪🇸",
    levels: [
      { skill: "Leitura", level: "Avançado", icon: BookOpen },
      { skill: "Escrita", level: "Avançado", icon: PenTool },
      { skill: "Escuta", level: "Avançado", icon: Ear },
      { skill: "Fala", level: "Intermediário", icon: MessageCircle },
    ]
  },
  {
    name: "Francês",
    flag: "🇫🇷",
    levels: [
      { skill: "Leitura", level: "Intermediário", icon: BookOpen },
      { skill: "Escrita", level: "Básico", icon: PenTool },
      { skill: "Escuta", level: "Intermediário", icon: Ear },
      { skill: "Fala", level: "Básico", icon: MessageCircle },
    ]
  },
  {
    name: "Árabe",
    flag: "🇸🇦",
    levels: [
      { skill: "Leitura", level: "Básico", icon: BookOpen },
      { skill: "Escrita", level: "Básico", icon: PenTool },
      { skill: "Escuta", level: "Básico", icon: Ear },
      { skill: "Fala", level: "Básico", icon: MessageCircle },
    ]
  },
];

const LanguagesSection = () => {
  return (
    <section id="languages" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="section-title">Idiomas</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
          {languagesData.map((lang, index) => (
            <div
              key={index}
              className="card group hover:transform hover:scale-105 transition-all duration-500"
            >
              {/* Cabeçalho do Idioma */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-3">
                  <span className="text-3xl">{lang.flag}</span>
                  {lang.name}
                </h3>
              </div>

              {/* Lista de Proficiências */}
              <div className="space-y-4">
                {lang.levels.map((item, itemIndex) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={itemIndex}
                      className="flex items-center justify-between gap-4 p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-3 text-gray-300">
                        <Icon size={18} className="text-primary-400" />
                        <span>{item.skill}</span>
                      </div>
                      <span className={`text-sm ${getLevelStyles(item.level)}`}>
                        {item.level}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LanguagesSection;