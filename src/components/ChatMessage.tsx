
import React from 'react';
import { Message } from '@/services/socket';
import { format } from 'date-fns';
import { useChatContext } from '@/contexts/ChatContext';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { currentUser } = useChatContext();
  const isCurrentUser = currentUser?.username === message.username;
  
  return (
    <div className={`flex mb-3 animate-fade-in ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`message-bubble ${isCurrentUser ? 'sent' : 'received'}`}>
        {!isCurrentUser && (
          <div className="font-semibold text-xs mb-1">{message.username}</div>
        )}
        <p>{message.text}</p>
        <div className="text-xs opacity-70 mt-1 text-right">
          {format(new Date(message.timestamp), 'h:mm a')}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
