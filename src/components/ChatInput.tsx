
import React, { useState, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendIcon } from 'lucide-react';
import { useChatContext } from '@/contexts/ChatContext';

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const { sendMessage, isConnected } = useChatContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && isConnected) {
      sendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        disabled={!isConnected}
        className="flex-1"
      />
      <Button 
        type="submit" 
        disabled={!message.trim() || !isConnected}
        className="bg-primary"
      >
        <SendIcon className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default ChatInput;
