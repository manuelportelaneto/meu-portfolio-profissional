// src/components/Chatbot.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

const Chatbot = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState(null);
  const messagesEndRef = useRef(null);

  // Efeito para rolar para a última mensagem
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [messages, isLoading, isOpen]);

  // CORREÇÃO: Remove a lógica de "startConversation". Apenas limpa o estado ao fechar.
  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setThreadId(null);
    }
  }, [isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { role: 'user', content: [{ type: 'text', text: { value: inputValue } }] };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api/chat';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: inputValue, threadId: threadId }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      const botMessage = { role: 'assistant', content: [{ type: 'text', text: { value: data.answer } }] };
      setMessages(prev => [...prev, botMessage]);
      setThreadId(data.threadId); // Armazena o threadId para a próxima mensagem.

    } catch (error) {
      console.error('Error fetching chat response:', error);
      const errorMessage = { role: 'assistant', content: [{ type: 'text', text: { value: 'Desculpe, não consegui me conectar. Tente novamente.' } }] };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => setIsOpen(prev => !prev);

  const renderMessageContent = (msg) => {
    if (msg.content && msg.content[0]?.type === 'text') {
      return msg.content[0].text.value.replace(/\n/g, '<br />');
    }
    return '';
  };

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
              className="w-[calc(100vw-3rem)] max-w-sm h-[70vh] max-h-[600px] bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src="/favicon.ico" alt="Manuel (bot) avatar" className="w-full h-full" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Manuel (bot)</h3>
                    <p className="text-xs text-green-400">Online</p>
                  </div>
                </div>
                <button onClick={toggleChat} className="p-2 rounded-full hover:bg-gray-700"><X size={20} /></button>
              </div>

              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {/* Mensagem de boas-vindas estática, que não depende de API */}
                  {messages.length === 0 && !isLoading && (
                    <div className="text-center text-xs text-gray-400 px-4 pt-4">
                      Este é o Manuel (bot). Faça uma pergunta sobre minha carreira, projetos ou habilidades.
                    </div>
                  )}
                  {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs md:max-w-sm px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-primary-600 text-white rounded-br-none' : 'bg-gray-700 text-gray-200 rounded-bl-none'}`}>
                        <p className="text-sm" dangerouslySetInnerHTML={{ __html: renderMessageContent(msg) }} />
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="px-4 py-2 rounded-2xl bg-gray-700 text-gray-200 rounded-bl-none">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 bg-primary-400 rounded-full animate-bounce delay-0"></span>
                          <span className="h-2 w-2 bg-primary-400 rounded-full animate-bounce delay-150"></span>
                          <span className="h-2 w-2 bg-primary-400 rounded-full animate-bounce delay-300"></span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Digite sua mensagem..." disabled={isLoading} className="flex-1 bg-gray-800 border border-gray-600 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm disabled:opacity-50" />
                  <button type="submit" disabled={isLoading} className="p-3 bg-primary-600 rounded-full hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    <Send size={18} className="text-white" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button onClick={toggleChat} className="w-16 h-16 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg text-white" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        </motion.button>
      </div>
    </>
  );
};

export default Chatbot;