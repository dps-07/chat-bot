
import React, { useState, useEffect } from 'react';
import { ChatProvider } from '@/contexts/ChatContext';
import UsernameDialog from '@/components/UsernameDialog';
import ChatHeader from '@/components/ChatHeader';
import MessageList from '@/components/MessageList';
import ChatInput from '@/components/ChatInput';
import RoomSelector from '@/components/RoomSelector';
import UsersList from '@/components/UsersList';
import { Toaster } from '@/components/ui/sonner';

const Index: React.FC = () => {
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    // Show the dialog after a short delay to ensure a smooth UI experience
    const timer = setTimeout(() => {
      setShowDialog(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <ChatProvider>
      <div className="min-h-screen flex flex-col">
        <Toaster position="top-right" />
        
        <header className="bg-primary text-primary-foreground p-4 shadow-md">
          <div className="container mx-auto">
            <h1 className="text-xl font-bold">WebSocket Chat</h1>
          </div>
        </header>
        
        <main className="flex-1 container mx-auto my-4 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 flex flex-col h-[calc(100vh-180px)] bg-card shadow-lg rounded-lg p-4 border">
              <ChatHeader />
              <RoomSelector />
              <MessageList />
              <div className="mt-auto pt-2 border-t">
                <ChatInput />
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <UsersList />
              
              <div className="bg-card p-4 rounded-lg shadow-lg border">
                <h2 className="text-lg font-semibold mb-2">About</h2>
                <p className="text-muted-foreground text-sm">
                  This is a real-time chat application using WebSockets.
                  Join different rooms and chat with other users in real-time!
                </p>
                <div className="mt-4 text-xs text-muted-foreground">
                  <p>Note: This is a simulated WebSocket environment.</p>
                  <p>In a production app, you would connect to a real WebSocket server.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <UsernameDialog open={showDialog} />
      </div>
    </ChatProvider>
  );
};

export default Index;
