import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface ConnectionSuggestionCardProps {
  content: string;
}

export function ConnectionSuggestionCard({ content }: ConnectionSuggestionCardProps) {
  // Simple approach: split by potential suggestion markers if AI formats with "Name:", "Profile:", "Reason:"
  // Or treat content as pre-formatted. For now, display as is.
  const formattedContent = content.split('\n').map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));

  return (
    <Card className="mt-6 bg-gradient-to-br from-primary/5 via-background to-accent/5 shadow-md">
      <CardHeader>
        <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl">Connection Suggestion</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground whitespace-pre-wrap">
          {formattedContent}
        </p>
      </CardContent>
    </Card>
  );
}
