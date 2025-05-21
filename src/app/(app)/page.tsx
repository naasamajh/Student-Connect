import { currentUser, mockEvents, mockGroups } from "@/lib/mock-data";
import { SmartConnectForm } from "@/components/smart-connect-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CalendarDays, Users, Activity } from "lucide-react";
import Image from "next/image";

export default function DashboardPage() {
  const upcomingEvents = mockEvents.slice(0, 2);
  const userGroups = mockGroups.filter(g => g.memberIds.includes(currentUser.id)).slice(0, 2);

  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-xl overflow-hidden">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-3xl font-bold">Welcome back, {currentUser.name}!</CardTitle>
              <CardDescription className="text-primary-foreground/80 text-lg mt-1">
                Ready to connect and explore new opportunities?
              </CardDescription>
            </div>
            <Activity className="h-16 w-16 text-primary-foreground/30 hidden md:block" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="max-w-2xl">
            Nexus is your hub for discovering like-minded peers, engaging in vibrant communities, and finding exciting events. Let's make some connections!
          </p>
        </CardContent>
      </Card>

      <SmartConnectForm currentUser={currentUser} />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">Upcoming Events</CardTitle>
            </div>
            <CardDescription>Don't miss out on these exciting events.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map(event => (
                <div key={event.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <Image 
                    src={event.imageUrl || "https://placehold.co/80x80.png"} 
                    alt={event.name} 
                    width={60} 
                    height={60} 
                    className="rounded-md object-cover aspect-square"
                    data-ai-hint="event meeting" 
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{event.name}</h4>
                    <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {event.location}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No upcoming events for now.</p>
            )}
          </CardContent>
          <CardFooter>
            <Link href="/events" legacyBehavior>
              <Button variant="outline" className="w-full shadow-sm">
                View All Events <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">Your Groups</CardTitle>
            </div>
            <CardDescription>Catch up with your communities.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {userGroups.length > 0 ? (
              userGroups.map(group => (
                <Link href={`/groups/${group.id}`} key={group.id} className="block p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <Image 
                      src={group.imageUrl || "https://placehold.co/80x80.png"} 
                      alt={group.name} 
                      width={60} 
                      height={60} 
                      className="rounded-md object-cover aspect-square"
                      data-ai-hint="team group"
                    />
                    <div>
                      <h4 className="font-semibold text-foreground">{group.name}</h4>
                      <p className="text-sm text-muted-foreground truncate max-w-xs">{group.description}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-muted-foreground">You haven't joined any groups yet.</p>
            )}
          </CardContent>
           <CardFooter>
            <Link href="/groups" legacyBehavior>
              <Button variant="outline" className="w-full shadow-sm">
                Discover More Groups <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
