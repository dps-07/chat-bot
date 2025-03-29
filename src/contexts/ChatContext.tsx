
import React, { createContext, useContext, useState, useEffect } from 'react';
import { socketService, Message, User } from '../services/socket';
import { useToast } from '@/components/ui/use-toast';

interface ChatContextType {
  currentUser: User | null;
  messages: Message[];
  users: User[];
  rooms: string[];
  currentRoom: string;
  isConnected: boolean;
  connect: (username: string) => void;
  disconnect: () => void;
  sendMessage: (text: string) => void;
  joinRoom: (room: string) => void;
}

const ChatContext = createContext<ChatContextType>({
  currentUser: null,
  messages: [],
  users: [],
  rooms: [],
  currentRoom: 'general',
  isConnected: false,
  connect: () => {},
  disconnect: () => {},
  sendMessage: () => {},
  joinRoom: () => {},
});

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [rooms, setRooms] = useState<string[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string>('general');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize available rooms
    setRooms(socketService.getRooms());

    // Set up event listeners
    const handleConnect = () => {
      setIsConnected(true);
      setCurrentUser(socketService.getCurrentUser());
      setUsers(socketService.getUsers());
      loadMessages(currentRoom);
      
      toast({
        title: "Connected",
        description: "You are now connected to the chat server.",
      });
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      setCurrentUser(null);
      
      toast({
        title: "Disconnected",
        description: "You have been disconnected from the chat server.",
        variant: "destructive",
      });
    };

    const handleMessage = (message: Message) => {
      if (message.room === currentRoom) {
        setMessages(prev => [...prev, message]);
      }
    };

    const handleRoomChange = (data: { room: string }) => {
      setCurrentRoom(data.room);
      loadMessages(data.room);
      
      toast({
        title: "Room Changed",
        description: `You joined the ${data.room} room.`,
      });
    };

    socketService.on('connect', handleConnect);
    socketService.on('disconnect', handleDisconnect);
    socketService.on('message', handleMessage);
    socketService.on('roomChange', handleRoomChange);

    return () => {
      socketService.off('connect', handleConnect);
      socketService.off('disconnect', handleDisconnect);
      socketService.off('message', handleMessage);
      socketService.off('roomChange', handleRoomChange);
    };
  }, [currentRoom, toast]);

  const loadMessages = (room: string) => {
    setMessages(socketService.getMessages(room));
  };

  const connect = (username: string) => {
    if (!username.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid username.",
        variant: "destructive",
      });
      return;
    }
    socketService.connect(username);
  };

  const disconnect = () => {
    socketService.disconnect();
  };

  const sendMessage = (text: string) => {
    if (!text.trim() || !isConnected) return;
    socketService.sendMessage(text);
  };

  const joinRoom = (room: string) => {
    if (room === currentRoom) return;
    socketService.joinRoom(room);
  };

  return (
    <ChatContext.Provider
      value={{
        currentUser,
        messages,
        users,
        rooms,
        currentRoom,
        isConnected,
        connect,
        disconnect,
        sendMessage,
        joinRoom,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
