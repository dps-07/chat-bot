
import { io, Socket } from 'socket.io-client';

// Mock server URL (in a real application, this would be your server URL)
// We'll simulate WebSocket behavior with socket.io-client
const SOCKET_URL = 'https://websocket-mock-server.lovable.dev';

export interface Message {
  id: string;
  text: string;
  username: string;
  room: string;
  timestamp: number;
}

export interface User {
  id: string;
  username: string;
}

class SocketService {
  private socket: Socket | null = null;
  private mockMessages: Message[] = [];
  private mockUsers: User[] = [
    { id: 'system', username: 'System' },
    { id: 'user1', username: 'Alice' },
    { id: 'user2', username: 'Bob' },
    { id: 'user3', username: 'Charlie' }
  ];
  private listeners: Record<string, Function[]> = {};
  private currentUserId: string = '';
  private currentUsername: string = '';
  private rooms = ['general', 'random', 'tech', 'support'];
  private currentRoom = 'general';
  private mockMessagesTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    // Initialize mock messages
    this.mockMessages = [
      {
        id: '1',
        text: 'Welcome to the chat!',
        username: 'System',
        room: 'general',
        timestamp: Date.now() - 5000000
      },
      {
        id: '2',
        text: 'Hey everyone!',
        username: 'Alice',
        room: 'general',
        timestamp: Date.now() - 4000000
      },
      {
        id: '3',
        text: 'Hi Alice, how are you today?',
        username: 'Bob',
        room: 'general',
        timestamp: Date.now() - 3000000
      },
      {
        id: '4',
        text: "I'm doing great, thanks for asking!",
        username: 'Alice',
        room: 'general',
        timestamp: Date.now() - 2000000
      },
      {
        id: '5',
        text: 'Anyone working on something interesting?',
        username: 'Charlie',
        room: 'random',
        timestamp: Date.now() - 1000000
      },
      {
        id: '6',
        text: "I'm learning about WebSockets!",
        username: 'Alice',
        room: 'tech',
        timestamp: Date.now() - 800000
      },
      {
        id: '7',
        text: 'Has anyone encountered this error in React?',
        username: 'Bob',
        room: 'support',
        timestamp: Date.now() - 500000
      }
    ];
  }

  connect(username: string): void {
    try {
      // In a real app, we would connect to a real server
      // this.socket = io(SOCKET_URL);
      
      // For our demo, we'll simulate WebSocket functionality
      this.currentUserId = `user_${Date.now()}`;
      this.currentUsername = username;
      
      // Add the current user to mock users
      this.mockUsers.push({ id: this.currentUserId, username });
      
      // Emit a connection event
      this.emit('connect', {});
      
      // Start mock message generation
      this.startMockMessages();
      
      console.log(`Connected as ${username} with ID ${this.currentUserId}`);
    } catch (error) {
      console.error('Failed to connect to WebSocket server:', error);
    }
  }

  disconnect(): void {
    if (this.mockMessagesTimeout) {
      clearTimeout(this.mockMessagesTimeout);
      this.mockMessagesTimeout = null;
    }
    
    this.mockUsers = this.mockUsers.filter(user => user.id !== this.currentUserId);
    this.emit('disconnect', {});
    this.listeners = {};
    console.log('Disconnected from WebSocket server');
  }

  joinRoom(room: string): void {
    this.currentRoom = room;
    this.emit('roomChange', { room });
    console.log(`Joined room: ${room}`);
  }

  sendMessage(text: string): void {
    const message: Message = {
      id: `msg_${Date.now()}`,
      text,
      username: this.currentUsername,
      room: this.currentRoom,
      timestamp: Date.now()
    };
    
    this.mockMessages.push(message);
    this.emit('message', message);
  }

  on(event: string, callback: Function): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback: Function): void {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
  }

  private emit(event: string, data: any): void {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }

  getRooms(): string[] {
    return this.rooms;
  }

  getMessages(room: string): Message[] {
    return this.mockMessages.filter(msg => msg.room === room);
  }

  getUsers(): User[] {
    return this.mockUsers;
  }

  getCurrentUser(): User {
    return { id: this.currentUserId, username: this.currentUsername };
  }

  private startMockMessages(): void {
    const generateRandomMessage = () => {
      // Skip if disconnected
      if (!this.currentUserId) return;
      
      const randomUser = this.mockUsers.filter(u => u.id !== this.currentUserId && u.id !== 'system')[
        Math.floor(Math.random() * (this.mockUsers.length - 2))
      ];
      
      if (!randomUser) return;
      
      const messages = [
        "Hey, how's it going?",
        "Anyone here?",
        "Just joined to say hi!",
        "Interesting discussion!",
        "I have a question about this topic.",
        "Great to see everyone here!",
        "What do you all think about the new features?",
        "I'm working on a similar project right now.",
        "Has anyone tried the latest update?",
        "Happy to be part of this chat!"
      ];
      
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      
      const message: Message = {
        id: `msg_${Date.now()}`,
        text: randomMessage,
        username: randomUser.username,
        room: this.currentRoom,
        timestamp: Date.now()
      };
      
      this.mockMessages.push(message);
      this.emit('message', message);
      
      // Schedule next random message
      this.mockMessagesTimeout = setTimeout(generateRandomMessage, Math.random() * 20000 + 10000); // 10-30 seconds
    };
    
    // Start the mock message generation
    this.mockMessagesTimeout = setTimeout(generateRandomMessage, Math.random() * 8000 + 5000); // 5-13 seconds
  }
}

// Export singleton instance
export const socketService = new SocketService();
