
"use client";

import { useState, useRef, useEffect } from 'react';
import { mockChats as initialMockChats, mockUserProfiles } from '@/lib/mock-data';
import type { Chat, Message, UserProfile } from '@/lib/types';
import { ChatList } from './chat-list';
import { ChatMessage } from './chat-message';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Paperclip, Smile, Search, ArrowLeft, Info, Loader2, MessageSquare } from 'lucide-react';
import { Card, CardHeader, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const getInitials = (name: string = "User") => {
  const names = name.split(' ');
  return names.length > 1 ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase() : name.substring(0, 2).toUpperCase();
};

interface ChatInterfaceProps {
  initialSelectedChatId?: string | null;
}

export function ChatInterface({ initialSelectedChatId }: ChatInterfaceProps) {
  const { currentUser, loading: authLoading } = useAuth();
  const [allChats, setAllChats] = useState<Chat[]>(initialMockChats);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [individualUsers, setIndividualUsers] = useState<UserProfile[]>([]);
  const [groupChats, setGroupChats] = useState<Chat[]>([]);

  useEffect(() => {
    if (currentUser) {
      setIndividualUsers(mockUserProfiles.filter(u => u.id !== currentUser.id));
      setGroupChats(allChats.filter(chat => chat.isGroupChat));
    }
  }, [currentUser, allChats]);
  
  useEffect(() => {
    if (authLoading || !currentUser) return;

    if (initialSelectedChatId && allChats.some(chat => chat.id === initialSelectedChatId)) {
      if (selectedChatId !== initialSelectedChatId) {
        setSelectedChatId(initialSelectedChatId);
      }
      return; 
    }

    if (!selectedChatId && !initialSelectedChatId && allChats.length > 0) { // only run default selection if no initial and no current
      const firstIndividualChat = allChats.find(chat => !chat.isGroupChat && chat.participants.some(p => p.id === currentUser.id));
      if (firstIndividualChat) {
        setSelectedChatId(firstIndividualChat.id);
      } else if (groupChats.length > 0) {
        setSelectedChatId(groupChats[0].id);
      }
    }
  }, [authLoading, currentUser, allChats, selectedChatId, initialSelectedChatId, groupChats]);


  const selectedChat = allChats.find(chat => chat.id === selectedChatId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [selectedChat?.messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat || !currentUser) return;

    const message: Message = {
      id: `msg${Date.now()}`,
      chatId: selectedChat.id,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatarUrl,
      content: newMessage.trim(),
      timestamp: Date.now(),
    };

    setAllChats(prevChats =>
      prevChats.map(chat =>
        chat.id === selectedChat.id
          ? { ...chat, messages: [...(chat.messages || []), message], lastMessage: message }
          : chat
      )
    );
    setNewMessage("");
  };
  
  const getChatPartner = (chat: Chat | undefined): Pick<UserProfile, 'id' | 'name' | 'avatarUrl'> | null => {
    if (!chat || chat.isGroupChat || !currentUser) return null;
    return chat.participants.find(p => p.id !== currentUser.id) || null;
  };

  const chatPartner = getChatPartner(selectedChat);

  const handleSelectItem = (itemId: string, type: 'user' | 'groupchat') => {
    if (!currentUser) return;

    if (type === 'groupchat') {
      setSelectedChatId(itemId);
    } else if (type === 'user') {
      const targetUserId = itemId;
      const existingChat = allChats.find(chat => 
        !chat.isGroupChat &&
        chat.participants.length === 2 &&
        chat.participants.some(p => p.id === currentUser.id) &&
        chat.participants.some(p => p.id === targetUserId)
      );

      if (existingChat) {
        setSelectedChatId(existingChat.id);
      } else {
        const targetUser = mockUserProfiles.find(u => u.id === targetUserId);
        if (!targetUser) return;

        const sortedUserIds = [currentUser.id, targetUser.id].sort();
        // Use a consistent ID format for 1-on-1 chats.
        const newChatId = `chat_${sortedUserIds[0]}_${sortedUserIds[1]}`;
        
        if (allChats.some(c => c.id === newChatId)) {
             setSelectedChatId(newChatId);
             return;
        }

        const newChat: Chat = {
          id: newChatId,
          participants: [
            { id: currentUser.id, name: currentUser.name, avatarUrl: currentUser.avatarUrl },
            { id: targetUser.id, name: targetUser.name, avatarUrl: targetUser.avatarUrl }
          ],
          messages: [],
          isGroupChat: false,
          name: targetUser.name, 
          unreadCount: 0,
        };
        setAllChats(prev => [...prev, newChat]);
        setSelectedChatId(newChat.id);
      }
    }
     if (window.innerWidth < 768 && selectedChatId !== null) { 
    }
  };


  if (authLoading || !currentUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-xl text-muted-foreground">Loading chat...</p>
      </div>
    );
  }

  return (
    <Card className="h-[calc(100vh-10rem)] md:h-[calc(100vh-12rem)] w-full flex flex-col shadow-2xl overflow-hidden">
      <div className="flex h-full">
        <div className={cn(
            "w-full md:w-1/3 lg:w-1/4 border-r flex-col bg-muted/10",
            selectedChatId && "hidden md:flex" 
        )}>
          <div className="p-4 border-b">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search users or chats..." className="pl-8 bg-background" />
            </div>
          </div>
          <ChatList
            users={individualUsers}
            groupChats={groupChats}
            existingChats={allChats}
            selectedChatId={selectedChatId}
            onSelectItem={handleSelectItem}
            currentUserId={currentUser.id}
          />
        </div>

        <div className={cn(
            "flex-1 flex-col",
            !selectedChatId && "hidden md:flex", 
            selectedChatId && "flex" 
        )}>
          {selectedChat ? (
            <>
              <CardHeader className="p-4 border-b flex flex-row items-center justify-between bg-muted/30">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => setSelectedChatId(null)}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedChat.isGroupChat ? `https://placehold.co/100x100.png?text=${getInitials(selectedChat.name || 'Group')}` : chatPartner?.avatarUrl} alt={selectedChat.name || chatPartner?.name} />
                      <AvatarFallback>{getInitials(selectedChat.name || chatPartner?.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-foreground">{selectedChat.name || chatPartner?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {selectedChat.isGroupChat 
                            ? `${selectedChat.participants.length} members` 
                            : (mockUserProfiles.find(u=>u.id === chatPartner?.id)?.bio?.substring(0,30) || 'Online') + '...' }
                        </p>
                    </div>
                </div>
                <Button variant="ghost" size="icon">
                    <Info className="h-5 w-5 text-muted-foreground" />
                </Button>
              </CardHeader>
              
              <ScrollArea className="flex-1 p-4 space-y-4 bg-background">
                {(selectedChat.messages || []).map(msg => (
                  <ChatMessage key={msg.id} message={msg} currentUserId={currentUser.id} />
                ))}
                <div ref={messagesEndRef} />
              </ScrollArea>

              <CardFooter className="p-4 border-t bg-muted/30">
                <form onSubmit={handleSendMessage} className="flex items-center w-full gap-2">
                  <Button variant="ghost" size="icon" type="button"><Paperclip className="h-5 w-5 text-muted-foreground" /></Button>
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-background"
                    autoComplete="off"
                  />
                  <Button variant="ghost" size="icon" type="button"><Smile className="h-5 w-5 text-muted-foreground" /></Button>
                  <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90">
                    <Send className="h-5 w-5 text-primary-foreground" />
                  </Button>
                </form>
              </CardFooter>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-muted/20">
              <MessageSquare className="h-24 w-24 text-muted-foreground/50 mb-6" />
              <h2 className="text-2xl font-semibold text-foreground mb-2">Select a user or group to start messaging</h2>
              <p className="text-muted-foreground max-w-sm">Choose someone from the list on the left, or explore groups and profiles to find new connections.</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
