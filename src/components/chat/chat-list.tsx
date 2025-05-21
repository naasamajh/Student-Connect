
"use client";

import type { Chat, UserProfile } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { User, Users } from 'lucide-react';

interface ChatListProps {
  users: UserProfile[];
  groupChats: Chat[];
  existingChats: Chat[]; // All chats, to find last messages for users
  selectedChatId: string | null;
  onSelectItem: (id: string, type: 'user' | 'groupchat') => void;
  currentUserId: string;
}

const getInitials = (name: string = "User") => {
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export function ChatList({ 
  users, 
  groupChats,
  existingChats, 
  selectedChatId, 
  onSelectItem, 
  currentUserId 
}: ChatListProps) {

  const findExisting1on1Chat = (userId: string): Chat | undefined => {
    return existingChats.find(chat => 
      !chat.isGroupChat &&
      chat.participants.length === 2 &&
      chat.participants.some(p => p.id === currentUserId) &&
      chat.participants.some(p => p.id === userId)
    );
  };

  return (
    <ScrollArea className="h-full">
      <div className="space-y-1 p-2">
        {/* List Individual Users */}
        {users.map((user) => {
          const existing1on1Chat = findExisting1on1Chat(user.id);
          const displayName = user.name;
          const displayAvatar = user.avatarUrl;
          const lastMessage = existing1on1Chat?.lastMessage;
          const unreadCount = existing1on1Chat?.unreadCount;
          
          // Determine if this user corresponds to the selected chat
          const isSelected = selectedChatId === existing1on1Chat?.id;

          return (
            <button
              key={user.id}
              onClick={() => onSelectItem(user.id, 'user')}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors hover:bg-muted",
                isSelected ? "bg-muted shadow-inner" : "hover:bg-muted/50"
              )}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={displayAvatar} alt={displayName || 'User'} data-ai-hint="person avatar"/>
                <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="font-semibold text-sm text-foreground truncate">{displayName || 'Unnamed User'}</p>
                {lastMessage ? (
                  <p className="text-xs text-muted-foreground truncate">
                    {lastMessage.senderId === currentUserId ? "You: " : (lastMessage.senderName ? `${lastMessage.senderName.split(' ')[0]}: ` : '')}
                    {lastMessage.content}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground italic">No messages yet</p>
                )}
              </div>
              {unreadCount && unreadCount > 0 && (
                <Badge variant="default" className="h-5 px-1.5 text-xs ml-auto self-center">{unreadCount}</Badge>
              )}
               {!lastMessage && <User className="h-4 w-4 text-muted-foreground ml-auto self-center" />}
            </button>
          );
        })}

        {/* Separator if both users and groups exist */}
        {users.length > 0 && groupChats.length > 0 && (
            <div className="flex items-center px-3 py-2">
                <span className="text-xs font-medium text-muted-foreground">GROUP CHATS</span>
                <hr className="flex-grow ml-2 border-muted-foreground/50"/>
            </div>
        )}

        {/* List Group Chats */}
        {groupChats.map((chat) => {
          const displayName = chat.name;
          const displayAvatar = `https://placehold.co/100x100.png?text=${getInitials(chat.name || 'Group')}`;
          const isSelected = selectedChatId === chat.id;

          return (
            <button
              key={chat.id}
              onClick={() => onSelectItem(chat.id, 'groupchat')}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors hover:bg-muted",
                isSelected ? "bg-muted shadow-inner" : "hover:bg-muted/50"
              )}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={displayAvatar} alt={displayName || 'Group Chat'} data-ai-hint="group icon"/>
                <AvatarFallback><Users size={18}/></AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="font-semibold text-sm text-foreground truncate">{displayName || 'Unnamed Group'}</p>
                {chat.lastMessage && (
                  <p className="text-xs text-muted-foreground truncate">
                    {chat.lastMessage.senderId === currentUserId ? "You: " : (chat.lastMessage.senderName ? `${chat.lastMessage.senderName.split(' ')[0]}: ` : '')}
                    {chat.lastMessage.content}
                  </p>
                )}
              </div>
              {chat.unreadCount && chat.unreadCount > 0 && (
                <Badge variant="default" className="h-5 px-1.5 text-xs ml-auto self-center">{chat.unreadCount}</Badge>
              )}
            </button>
          );
        })}
      </div>
    </ScrollArea>
  );
}
