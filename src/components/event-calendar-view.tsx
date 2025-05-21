"use client";

import * as React from 'react'; // Added this line
import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import type { Event } from "@/lib/types";
import { EventCard } from "./event-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { AlertCircle } from 'lucide-react';

interface EventCalendarViewProps {
  events: Event[];
}

export function EventCalendarView({ events: initialEvents }: EventCalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>(initialEvents); // Allow modification if needed for filtering, etc.
  
  // Memoize events by date for quick lookup
  const eventsByDate = React.useMemo(() => {
    const map = new Map<string, Event[]>();
    events.forEach(event => {
      const dateStr = new Date(event.date).toDateString();
      if (!map.has(dateStr)) {
        map.set(dateStr, []);
      }
      map.get(dateStr)?.push(event);
    });
    return map;
  }, [events]);

  const selectedDayEvents = selectedDate ? eventsByDate.get(selectedDate.toDateString()) || [] : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1 shadow-lg h-fit">
        <CardHeader>
            <CardTitle>Select a Date</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
            <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            modifiers={{
                hasEvent: Array.from(eventsByDate.keys()).map(dateStr => new Date(dateStr))
            }}
            modifiersStyles={{
                hasEvent: { fontWeight: 'bold', color: 'hsl(var(--primary))' }
            }}
            />
        </CardContent>
      </Card>

      <div className="md:col-span-2 space-y-6">
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>
                    Events on {selectedDate ? selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Selected Date'}
                </CardTitle>
                <CardDescription>
                    {selectedDayEvents.length > 0 ? `Found ${selectedDayEvents.length} event(s).` : "No events scheduled for this day."}
                </CardDescription>
            </CardHeader>
            <CardContent>
            {selectedDayEvents.length > 0 ? (
                <div className="space-y-4">
                {selectedDayEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
                </div>
            ) : (
                <div className="text-center py-8 text-muted-foreground">
                    <AlertCircle className="mx-auto h-12 w-12 mb-4" />
                    <p>No events on this day. Try selecting another date!</p>
                </div>
            )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
