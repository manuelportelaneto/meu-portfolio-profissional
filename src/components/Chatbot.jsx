// src/components/Chatbot.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState(null); // Estado para guardar o ID da conversa
  const messagesEndRef = useRef(null);

  // Efeito para rolar para a última mensagem
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [messages, isLoading, isOpen]);

  // Limpa o histórico e o threadId ao fechar, para uma nova conversa na próxima vez
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
      const response = await fetch('https://manuel-bot-backend.onrender.com/api/chat', { // <-- A URL DA VITÓRIA
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: inputValue, threadId: threadId }), // Envia a pergunta e o threadId atual
      });

      const data = await response.json();
      
      if (data.error) throw new Error(data.error);
      
      const botMessage = { role: 'assistant', content: [{ type: 'text', text: { value: data.answer } }] };
      setMessages(prev => [...prev, botMessage]);
      setThreadId(data.threadId); // Salva o ID da conversa para a próxima mensagem

    } catch (error) {
      console.error('Error fetching chat response:', error);
      const errorMessage = { role: 'assistant', content: [{ type: 'text', text: { value: 'Desculpe, não consegui me conectar. Tente novamente.' } }] };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  }

  // A função para renderizar mensagens agora lê o formato da API de Assistentes
  const renderMessageContent = (msg) => {
    if (msg.content[0]?.type === 'text') {
      return msg.content[0].text.value.replace(/\n/g, '<br />');
    }
    return '';
  }

  return (
    <>
      <div className="fixed bottom-24 right-6 z-[60]">
        <AnimatePresence>
          {isOpen && (
            <motion.div /* ... sua janela de chat ... */ >
              {/* Header */}
              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs md:max-w-sm px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-primary-600 text-white rounded-br-none' : 'bg-gray-700 text-gray-200 rounded-bl-none'}`}>
                        <p className="text-sm" dangerouslySetInnerHTML={{ __html: renderMessageContent(msg) }} />
                      </div>
                    </div>
                  ))}
                  {isLoading && ( /* ... indicador de loading ... */ )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              {/* Input Form */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button onClick={toggleChat} /* ... sua bolha flutuante ... */ >
          {isOpen ? <X size={28}/> : <MessageCircle size={28} />}
        </motion.button>
      </div>
    </>
  );
};

export default Chatbot;