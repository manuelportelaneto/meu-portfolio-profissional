import React from 'react';
import { X } from 'lucide-react';

const PrivacyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    // Backdrop - Fundo escuro semi-transparente
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* Modal Content - O container principal do modal */}
      <div 
        className="bg-gray-900 border border-gray-700 rounded-2xl shadow-xl w-11/12 md:w-3/4 lg:w-1/2 max-h-[80vh] flex flex-col"
        onClick={e => e.stopPropagation()} // Impede que o clique dentro do modal o feche
      >
        {/* Cabeçalho do Modal */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Política de Privacidade e Cookies</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        {/* Corpo do Modal - Onde o texto entra (com rolagem) */}
        <div className="p-6 text-gray-300 overflow-y-auto">
          <p className="mb-2 text-sm text-gray-400"><strong>Última atualização:</strong> 02 de Outubro de 2025</p>

          <h3 className="text-lg font-semibold text-white mt-4 mb-2">1. Introdução</h3>
          <p>Bem-vindo ao meu portfólio profissional. Esta política de privacidade explica como eu, Manuel Portela Neto, utilizo dados coletados através do site manuelportelaneto.cloudmatrix.com.br para entender melhor o tráfego de visitantes e aprimorar a experiência do usuário.</p>

          <h3 className="text-lg font-semibold text-white mt-4 mb-2">2. Coleta de Dados</h3>
          <p>Este site utiliza ferramentas de análise de terceiros para coletar informações sobre sua visita. Especificamente:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            {/* INFORMAÇÃO DO GOOGLE ANALYTICS ADICIONADA AQUI */}
            <li><strong>Google Analytics:</strong> Esta ferramenta coleta estatísticas de visitantes, como país de origem, páginas mais acessadas e tempo de permanência, para entendermos o alcance e a performance do portfólio.</li>
            <li><strong>Microsoft Clarity:</strong> Esta ferramenta nos ajuda a entender como os usuários interagem com a página através de mapas de calor (heatmaps) e gravações de sessão anônimas. O Clarity captura a interação do usuário, mas se esforça para anonimizar dados sensíveis.</li>
            <li><strong>Cookies:</strong> Pequenos arquivos são armazenados no seu navegador para auxiliar no funcionamento das ferramentas de análise e para registrar o seu consentimento sobre o uso de cookies.</li>
          </ul>
          <p className="mt-2">Os dados coletados podem incluir seu endereço IP (anonimizado), tipo de dispositivo e navegador, páginas visitadas e tempo gasto no site.</p>
          
          <h3 className="text-lg font-semibold text-white mt-4 mb-2">3. Uso dos Dados</h3>
          <p>As informações coletadas são usadas exclusivamente para fins analíticos, com o objetivo de entender quais seções do portfólio são mais interessantes, identificar problemas de usabilidade e otimizar a performance do site. Nenhum dado coletado é vendido ou compartilhado com terceiros para fins de marketing.</p>
          
          <h3 className="text-lg font-semibold text-white mt-4 mb-2">4. Seus Direitos</h3>
          <p>Você tem o direito de gerenciar e desabilitar cookies através das configurações do seu navegador.</p>
          
          <h3 className="text-lg font-semibold text-white mt-4 mb-2">5. Contato</h3>
          <p>Se tiver qualquer dúvida sobre esta política de privacidade, por favor, entre em contato através do e-mail: manuelportela@cloudmatrix.com.br.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;