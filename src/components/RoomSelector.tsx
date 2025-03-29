
import React from 'react';
import { useChatContext } from '@/contexts/ChatContext';
import { cn } from '@/lib/utils';

const RoomSelector: React.FC = () => {
  const { rooms, currentRoom, joinRoom } = useChatContext();

  return (
    <div className="flex overflow-x-auto py-2 gap-2 mb-4">
      {rooms.map((room) => (
        <button
          key={room}
          onClick={() => joinRoom(room)}
          className={cn('room-btn', {
            'active': currentRoom === room,
          })}
        >
          #{room}
        </button>
      ))}
    </div>
  );
};

export default RoomSelector;
