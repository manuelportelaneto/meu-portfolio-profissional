// src/components/Chatbot.jsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const Chatbot = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]); // Histórico no formato da API Gemini
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Efeito para rolar para a última mensagem
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [messages, isLoading, isOpen]);

  // Limpa o chat ao fechar (opcional, mas mantém o estado limpo como estava)
  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setChatHistory([]);
    }
  }, [isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const currentInput = inputValue.trim();
    // Mensagem local para exibição imediata
    const userMessage = { role: 'user', content: currentInput };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const apiUrl = '/api/chat';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          question: currentInput, 
          history: chatHistory 
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      const botMessage = { role: 'assistant', content: data.answer };
      setMessages(prev => [...prev, botMessage]);
      setChatHistory(data.history);

    } catch (error) {
      console.error('Error fetching chat response:', error);
      const errorMessage = { 
        role: 'assistant', 
        content: 'Ops! Ocorreu um erro técnico. Pode tentar perguntar novamente?' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => setIsOpen(prev => !prev);

  return (
    <>
      <div className="fixed bottom-24 right-6 z-[60]">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-[calc(100vw-3rem)] max-w-sm h-[70vh] max-h-[600px] bg-gray-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header com gradiente premium */}
              <div className="bg-gradient-to-r from-primary-600/20 to-purple-600/20 p-4 border-b border-white/10 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center border border-primary-500/30">
                      <Bot className="text-primary-400" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">Manuel Bot</h3>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Sempre pronto</p>
                      </div>
                    </div>
                  </div>
                  <button onClick={toggleChat} className="p-2 rounded-xl hover:bg-white/5 transition-colors group">
                    <X size={18} className="text-gray-400 group-hover:text-white" />
                  </button>
                </div>
              </div>

              {/* Área de Mensagens */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-white/10">
                {messages.length === 0 && !isLoading && (
                  <div className="text-center py-8 px-6">
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Olá! Sou o assistente do Manuel. Pergunte-me sobre sua carreira, projetos ou tecnologias que ele domina.
                      </p>
                    </div>
                  </div>
                )}
                
                {messages.map((msg, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}
                  >
                    {msg.role !== 'user' && (
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                        <Bot size={14} className="text-primary-400" />
                      </div>
                    )}
                    <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-primary-600 text-white rounded-tr-none' 
                        : 'bg-white/5 text-gray-200 border border-white/10 rounded-tl-none'
                    }`}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </motion.div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                      <Bot size={14} className="text-primary-400" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 rounded-tl-none">
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 bg-primary-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-1.5 w-1.5 bg-primary-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-1.5 w-1.5 bg-primary-400 rounded-full animate-bounce"></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input de Mensagem */}
              <form onSubmit={handleSendMessage} className="p-4 bg-gray-900/50 border-t border-white/10">
                <div className="relative flex items-center gap-2">
                  <input 
                    type="text" 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                    placeholder="Pergunte algo..." 
                    disabled={isLoading} 
                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm text-white placeholder:text-gray-500 transition-all disabled:opacity-50" 
                  />
                  <button 
                    type="submit" 
                    disabled={isLoading || !inputValue.trim()} 
                    className="absolute right-1.5 p-2 bg-primary-600 rounded-xl hover:bg-primary-500 transition-all disabled:opacity-50 disabled:grayscale"
                  >
                    <Send size={18} className="text-white" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Botão Flutuante */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button 
          onClick={toggleChat} 
          className="w-16 h-16 bg-gradient-to-br from-primary-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl text-white border border-white/20"
          whileHover={{ scale: 1.05, rotate: 5 }} 
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        </motion.button>
      </div>
    </>
  );
};

export default Chatbot;