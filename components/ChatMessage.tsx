import React from 'react';
import { MessageSender } from '../types';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // For GitHub Flavored Markdown (tables, task lists etc.)

interface ChatMessageProps {
  sender: MessageSender;
  text: string;
  timestamp: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, text, timestamp }) => {
  const isUser = sender === MessageSender.User;
  const messageClasses = isUser
    ? 'bg-blue-500 text-white self-end rounded-br-none'
    : 'bg-gray-200 text-gray-800 self-start rounded-bl-none';

  return (
    <div className={`flex flex-col max-w-3/4 mx-2 my-2 p-3 rounded-lg shadow-md ${messageClasses}`}>
      <div className="text-sm">
        <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
      </div>
      <div className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'} text-right`}>
        {timestamp.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default ChatMessage;