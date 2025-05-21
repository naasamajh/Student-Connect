
"use client";

import type { Chat } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface ChatListProps {
  chats: Chat[];
  selectedChatId: string | null;
  onSelectChat: (chatId: string) => void;
  currentUserId: string; // Added to correctly identify the other participant
}

const getInitials = (name: string = "User") => {
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export function ChatList({ chats, selectedChatId, onSelectChat, currentUserId }: ChatListProps) {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-1 p-2">
        {chats.map((chat) => {
          const otherParticipant = chat.isGroupChat ? null : chat.participants.find(p => p.id !== currentUserId);
          const displayName = chat.isGroupChat ? chat.name : otherParticipant?.name;
          const displayAvatar = chat.isGroupChat 
            ? `https://placehold.co/100x100.png?text=${getInitials(chat.name || 'Group')}` 
            : otherParticipant?.avatarUrl;

          return (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors hover:bg-muted",
                selectedChatId === chat.id ? "bg-muted shadow-inner" : "hover:bg-muted/50"
              )}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={displayAvatar} alt={displayName || 'Chat'} data-ai-hint="person avatar"/>
                <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="font-semibold text-sm text-foreground truncate">{displayName || 'Unnamed Chat'}</p>
                {chat.lastMessage && (
                  <p className="text-xs text-muted-foreground truncate">
                    {chat.lastMessage.senderId === currentUserId ? "You: " : chat.lastMessage.senderName && `${chat.lastMessage.senderName}: `}
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
