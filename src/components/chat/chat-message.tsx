
"use client";

import type { Message } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage }
from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { currentUser } from '@/lib/mock-data'; // To determine if message is from current user
import { useState, useEffect } from 'react';

interface ChatMessageProps {
  message: Message;
}

const getInitials = (name: string = "User") => {
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isCurrentUserMessage = message.senderId === currentUser.id;
  const [formattedTime, setFormattedTime] = useState<string | null>(null);

  useEffect(() => {
    const messageDate = new Date(message.timestamp);
    setFormattedTime(
      messageDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
    );
  }, [message.timestamp]);

  return (
    <div className={cn("flex items-end gap-2 max-w-[75%]", isCurrentUserMessage ? "ml-auto flex-row-reverse" : "mr-auto")}>
      {!isCurrentUserMessage && (
        <Avatar className="h-8 w-8 self-start">
          <AvatarImage src={message.senderAvatar} alt={message.senderName || 'User'} />
          <AvatarFallback>{getInitials(message.senderName)}</AvatarFallback>
        </Avatar>
      )}
      <div className={cn(
        "p-3 rounded-lg shadow-md",
        isCurrentUserMessage ? "bg-primary text-primary-foreground rounded-br-none" : "bg-card text-card-foreground rounded-bl-none"
      )}>
        {!isCurrentUserMessage && message.senderName && (
            <p className="text-xs font-semibold mb-1">{message.senderName}</p>
        )}
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <p className={cn(
            "text-xs mt-1",
            isCurrentUserMessage ? "text-primary-foreground/70 text-right" : "text-muted-foreground/70 text-left"
        )}>
            {formattedTime || '...'}
        </p>
      </div>
    </div>
  );
}
