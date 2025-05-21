
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Users, CalendarDays, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary">
      <header className="p-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Nexus</h1>
        <nav className="flex gap-2">
          <Link href="/login">
            <Button variant="ghost">
              <LogIn className="mr-2 h-4 w-4" /> Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Sign Up
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
        <Image 
          src="https://placehold.co/600x400.png" 
          alt="Nexus platform illustration" 
          width={600} 
          height={400} 
          className="rounded-xl shadow-2xl mb-12"
          data-ai-hint="team collaboration network"
        />
        
        <h2 className="text-5xl font-extrabold text-foreground mb-6">
          Connect, Collaborate, Create.
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mb-10">
          Nexus helps students discover peers with shared interests, join vibrant groups,
          find exciting events, and build meaningful connections beyond the classroom.
        </p>
        
        <Link href="/signup">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
          <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md">
            <Zap className="h-12 w-12 text-accent mb-4" />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Smart Connections</h3>
            <p className="text-muted-foreground text-sm">
              AI-powered suggestions to find students who share your passions and academic goals.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md">
            <Users className="h-12 w-12 text-accent mb-4" />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Interest Groups</h3>
            <p className="text-muted-foreground text-sm">
              Create or join groups focused on anything from coding clubs to hiking adventures.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md">
            <CalendarDays className="h-12 w-12 text-accent mb-4" />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Events Calendar</h3>
            <p className="text-muted-foreground text-sm">
              Stay updated on workshops, seminars, and social gatherings relevant to you.
            </p>
          </div>
        </div>
      </main>

      <footer className="p-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Nexus. All rights reserved.</p>
      </footer>
    </div>
  );
}
