import { ChatInterface } from "@/components/chat/chat-interface";
import { MessageSquare } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="space-y-8 h-full flex flex-col">
       <div className="flex items-center gap-2 p-4 bg-card rounded-lg shadow md:hidden"> {/* Hidden on md and up as header exists */}
          <MessageSquare className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Messages</h1>
        </div>
      <div className="flex-grow">
        <ChatInterface />
      </div>
    </div>
  );
}
