import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage as ChatMessageType, MessageSender } from './types';
import ChatInput from './components/ChatInput';
import ChatMessage from './components/ChatMessage';
import { getEnergyEfficiencySolution } from './services/geminiService';
import { APP_TITLE, APP_DESCRIPTION } from './constants';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = useCallback(async (text: string) => {
    const newUserMessage: ChatMessageType = {
      id: Date.now().toString(),
      sender: MessageSender.User,
      text: text,
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsLoading(true);

    try {
      const aiResponseText = await getEnergyEfficiencySolution(text);
      const newAiMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        sender: MessageSender.AI,
        text: aiResponseText,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, newAiMessage]);
    } catch (error) {
      console.error('Error handling AI response:', error);
      const errorMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        sender: MessageSender.AI,
        text: 'Lo siento, hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.',
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen w-full max-w-5xl bg-gray-50 rounded-lg shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 shadow-md z-10 sticky top-0">
        <h1 className="text-3xl font-bold mb-1 text-center">{APP_TITLE}</h1>
        <p className="text-sm text-center opacity-90">{APP_DESCRIPTION}</p>
        <div className="mt-4 text-xs text-center border-t border-blue-400 pt-2">
          <p>Tu arquitecto técnico experto en Domótica y eficiencia energética, basado en la 'Guía práctica de la energía para la rehabilitación de edificios' del IDAE.</p>
          <p className="mt-1">
            Para ver la información de facturación o seleccionar una clave API, haz clic
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline text-blue-200 hover:text-white"> aquí</a>.
          </p>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100 custom-scrollbar">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            <p className="text-lg mb-2">¡Hola! Soy tu asesor en eficiencia energética.</p>
            <p>¿Cómo puedo ayudarte hoy con tu vivienda o tus problemas de consumo?</p>
            <p className="text-sm mt-4 text-gray-400">Ejemplo: "Mi casa es antigua, de los años 70, y tengo facturas de calefacción muy altas en invierno. Vivo en un piso con ventanas viejas."</p>
          </div>
        )}
        {messages.map((message) => (
          <ChatMessage key={message.id} sender={message.sender} text={message.text} timestamp={message.timestamp} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 z-10">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default App;