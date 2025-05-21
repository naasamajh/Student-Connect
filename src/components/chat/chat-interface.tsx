
"use client";

import { useState, useRef, useEffect } from 'react';
import { mockChats, mockMessages, currentUser, mockUserProfiles } from '@/lib/mock-data';
import type { Chat, Message, UserProfile } from '@/lib/types';
import { ChatList } from './chat-list';
import { ChatMessage } from './chat-message';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Paperclip, Smile, Search, ArrowLeft, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const getInitials = (name: string = "User") => {
  const names = name.split(' ');
  return names.length > 1 ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase() : name.substring(0, 2).toUpperCase();
};


export function ChatInterface() {
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(mockChats[0]?.id || null);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedChat = chats.find(chat => chat.id === selectedChatId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [selectedChat?.messages]);
  
  useEffect(() => { // Select first chat by default if none selected and chats exist
    if (!selectedChatId && chats.length > 0) {
        setSelectedChatId(chats[0].id);
    }
  }, [chats, selectedChatId]);


  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    const message: Message = {
      id: `msg${Date.now()}`,
      chatId: selectedChat.id,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatarUrl,
      content: newMessage.trim(),
      timestamp: Date.now(),
    };

    // Update mock data (client-side only)
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === selectedChat.id
          ? { ...chat, messages: [...chat.messages, message], lastMessage: message }
          : chat
      )
    );
    setNewMessage("");
  };
  
  const getChatPartner = (chat: Chat | undefined): UserProfile | null => {
    if (!chat || chat.isGroupChat) return null;
    return chat.participants.find(p => p.id !== currentUser.id) || null;
  };

  const chatPartner = getChatPartner(selectedChat);

  return (
    <Card className="h-[calc(100vh-10rem)] md:h-[calc(100vh-12rem)] w-full flex flex-col shadow-2xl overflow-hidden">
      <div className="flex h-full">
        {/* Chat List Sidebar */}
        <div className={cn(
            "w-full md:w-1/3 lg:w-1/4 border-r flex-col",
            selectedChatId && "hidden md:flex" // Hide on mobile when a chat is selected
        )}>
          <div className="p-4 border-b">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search chats..." className="pl-8" />
            </div>
          </div>
          <ChatList chats={chats} selectedChatId={selectedChatId} onSelectChat={setSelectedChatId} />
        </div>

        {/* Chat Window */}
        <div className={cn(
            "flex-1 flex-col",
            !selectedChatId && "hidden md:flex", // Hide on mobile if no chat is selected
            selectedChatId && "flex" // Show if chat is selected
        )}>
          {selectedChat ? (
            <>
              <CardHeader className="p-4 border-b flex flex-row items-center justify-between bg-muted/30">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => setSelectedChatId(null)}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedChat.isGroupChat ? `https://placehold.co/100x100.png?text=${getInitials(selectedChat.name)}` : chatPartner?.avatarUrl} alt={selectedChat.name || chatPartner?.name} />
                      <AvatarFallback>{getInitials(selectedChat.name || chatPartner?.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-foreground">{selectedChat.name || chatPartner?.name}</p>
                        <p className="text-xs text-muted-foreground">{selectedChat.isGroupChat ? `${selectedChat.participants.length} members` : 'Online'}</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon">
                    <Info className="h-5 w-5 text-muted-foreground" />
                </Button>
              </CardHeader>
              
              <ScrollArea className="flex-1 p-4 space-y-4 bg-background">
                {selectedChat.messages.map(msg => (
                  <ChatMessage key={msg.id} message={msg} />
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
              <h2 className="text-2xl font-semibold text-foreground mb-2">Select a chat to start messaging</h2>
              <p className="text-muted-foreground max-w-sm">Or find new connections and start a conversation with someone new from their profile or group pages.</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
