
import React from 'react';
import { useChatContext } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { LogOut, MessageCircle } from 'lucide-react';

const ChatHeader: React.FC = () => {
  const { currentRoom, disconnect, currentUser } = useChatContext();

  return (
    <div className="border-b pb-4 mb-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-primary" />
        <h1 className="text-xl font-bold">
          #{currentRoom}
        </h1>
      </div>
      
      {currentUser && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={disconnect}
          className="flex items-center gap-1"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Disconnect</span>
        </Button>
      )}
    </div>
  );
};

export default ChatHeader;
