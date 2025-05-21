import type { Group } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Users, Tag, ArrowRight } from "lucide-react";

interface GroupCardProps {
  group: Group;
}

const getInitials = (name: string) => {
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export function GroupCard({ group }: GroupCardProps) {
  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden">
      <CardHeader className="p-0">
        <Image
          src={group.imageUrl || `https://placehold.co/400x200.png`}
          alt={group.name}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
          data-ai-hint="group community"
        />
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-2xl font-semibold mb-2 text-foreground">{group.name}</CardTitle>
        <CardDescription className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
          {group.description}
        </CardDescription>
        
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Users className="h-4 w-4 mr-2 text-primary" />
          <span>{group.members.length} member{group.members.length === 1 ? '' : 's'}</span>
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <Tag className="h-4 w-4 mr-2 text-primary" />
          <span className="truncate">
            {group.interests.slice(0, 3).join(', ')}{group.interests.length > 3 ? '...' : ''}
          </span>
        </div>
        
        <div className="mt-4 flex -space-x-2 overflow-hidden">
          {group.members.slice(0, 5).map((member) => (
            <Avatar key={member.id} className="inline-block h-8 w-8 rounded-full ring-2 ring-background">
              <AvatarImage src={member.avatarUrl} alt={member.name} />
              <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
            </Avatar>
          ))}
          {group.members.length > 5 && (
            <Avatar className="inline-block h-8 w-8 rounded-full ring-2 ring-background bg-muted">
              <AvatarFallback>+{group.members.length - 5}</AvatarFallback>
            </Avatar>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-6 bg-muted/30 border-t">
        <Link href={`/groups/${group.id}`} legacyBehavior>
          <Button className="w-full shadow-md">
            View Group <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
