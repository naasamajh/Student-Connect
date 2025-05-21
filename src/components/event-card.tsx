import type { Event } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CalendarDays, MapPin, Users, Tag, Info } from "lucide-react";
import { Badge } from "./ui/badge";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden">
      <CardHeader className="p-0">
        <Image
          src={event.imageUrl || `https://placehold.co/400x200.png`}
          alt={event.name}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
          data-ai-hint="event conference"
        />
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-2xl font-semibold mb-2 text-foreground">{event.name}</CardTitle>
        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2 text-primary" />
            <span>{formattedDate} at {formattedTime}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-primary" />
            <span>Organized by: {event.organizer}</span>
          </div>
        </div>
        <CardDescription className="text-foreground/90 mb-4 line-clamp-3 leading-relaxed">
          {event.description}
        </CardDescription>
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-muted-foreground mr-1 self-center"><Tag className="inline h-4 w-4 mr-1 text-primary"/>Tags:</span>
          {event.relatedInterests.map(interest => (
            <Badge key={interest} variant="secondary" className="shadow-sm">{interest}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 bg-muted/30 border-t">
        <Button variant="outline" className="w-full shadow-sm">
          <Info className="mr-2 h-4 w-4" />
          More Info & RSVP (Coming Soon)
        </Button>
      </CardFooter>
    </Card>
  );
}
