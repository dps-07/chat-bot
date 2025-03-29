
import React, { useEffect, useRef } from 'react';
import { useChatContext } from '@/contexts/ChatContext';
import ChatMessage from './ChatMessage';

const MessageList: React.FC = () => {
  const { messages, currentRoom } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-2 py-4 messages-container">
      {messages.length === 0 ? (
        <div className="text-center text-muted-foreground py-10">
          No messages in {currentRoom} yet. Start the conversation!
        </div>
      ) : (
        messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
