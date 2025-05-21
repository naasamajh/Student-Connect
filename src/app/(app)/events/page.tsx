import { mockEvents } from "@/lib/mock-data";
import { EventCalendarView } from "@/components/event-calendar-view";
import { EventCard } from "@/components/event-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, ListChecks, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link"; // Assuming future "create event" page

export default function EventsPage() {
  // Sort events by date, soonest first for the list view
  const sortedEvents = [...mockEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 bg-card rounded-lg shadow">
        <div className="flex items-center gap-2">
            <CalendarDays className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Events</h1>
        </div>
        {/* Future "Create Event" button */}
        {/* 
        <Link href="/events/new" legacyBehavior>
          <Button className="shadow-md">
            <PlusCircle className="mr-2 h-4 w-4" /> Create Event
          </Button>
        </Link>
        */}
      </div>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-1/2 mb-6 shadow-sm">
          <TabsTrigger value="calendar" className="gap-2">
            <CalendarDays className="h-4 w-4" /> Calendar View
          </TabsTrigger>
          <TabsTrigger value="list" className="gap-2">
            <ListChecks className="h-4 w-4" /> List View
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar">
          <EventCalendarView events={sortedEvents} />
        </TabsContent>
        
        <TabsContent value="list">
          {sortedEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CalendarDays className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">No events scheduled.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
