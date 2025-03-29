
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useChatContext } from '@/contexts/ChatContext';

interface UsernameDialogProps {
  open: boolean;
}

const UsernameDialog: React.FC<UsernameDialogProps> = ({ open }) => {
  const [username, setUsername] = useState('');
  const { connect, isConnected } = useChatContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      connect(username.trim());
    }
  };

  return (
    <Dialog open={open && !isConnected}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Enter your username</DialogTitle>
            <DialogDescription>
              Choose a username to identify yourself in the chat.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                autoFocus
                placeholder="e.g., JohnDoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              disabled={!username.trim()} 
              className="w-full sm:w-auto"
            >
              Join Chat
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UsernameDialog;
