
import React from 'react';
import { useChatContext } from '@/contexts/ChatContext';
import { Badge } from '@/components/ui/badge';
import { User, Users } from 'lucide-react';

const UsersList: React.FC = () => {
  const { users, currentUser } = useChatContext();

  return (
    <div className="bg-secondary/50 p-4 rounded-lg mb-4">
      <div className="flex items-center gap-2 text-sm font-medium mb-3">
        <Users className="h-4 w-4" />
        <span>Online Users ({users.length})</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {users.map((user) => (
          <Badge 
            key={user.id} 
            variant={user.id === 'system' ? 'outline' : 'default'}
            className={`flex items-center gap-1 ${
              user.id === currentUser?.id ? 'bg-primary' : 
              user.id === 'system' ? 'bg-secondary' : 'bg-secondary/80'
            }`}
          >
            <User className="h-3 w-3" />
            {user.username}
            {user.id === currentUser?.id && ' (you)'}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
