
"use client"; // This page now uses hooks

import { Suspense } from 'react'; // For suspense boundary with useSearchParams
import { ChatInterface } from "@/components/chat/chat-interface";
import { MessageSquare, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

function MessagesPageContent() {
  const searchParams = useSearchParams();
  const initialChatId = searchParams.get("chatId");

  return (
    <div className="space-y-8 h-full flex flex-col">
       <div className="flex items-center gap-2 p-4 bg-card rounded-lg shadow md:hidden">
          <MessageSquare className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Messages</h1>
        </div>
      <div className="flex-grow">
        <ChatInterface initialSelectedChatId={initialChatId} />
      </div>
    </div>
  );
}

export default function MessagesPage() {
  return (
    // Suspense is recommended by Next.js when using useSearchParams
    // in a page that could be statically rendered otherwise.
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-xl text-muted-foreground">Loading messages...</p>
      </div>
    }>
      <MessagesPageContent />
    </Suspense>
  );
}
