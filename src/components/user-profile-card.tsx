import type { UserProfile } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Briefcase, BookOpen, Sparkles, Users } from "lucide-react";

interface UserProfileCardProps {
  user: UserProfile;
}

const getInitials = (name: string) => {
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <Card className="w-full shadow-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-br from-primary/10 to-accent/10 p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background shadow-lg">
            <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="profile person" />
            <AvatarFallback className="text-3xl md:text-4xl">{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <CardTitle className="text-3xl md:text-4xl font-bold text-foreground">{user.name}</CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-1">{user.email}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 md:p-8 space-y-6">
        {user.bio && (
          <div>
            <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-2">Bio</h3>
            <p className="text-foreground/90 leading-relaxed">{user.bio}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-3 flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-primary" />
              Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest) => (
                <Badge key={interest} variant="secondary" className="text-sm shadow-sm">{interest}</Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-3 flex items-center">
              <Briefcase className="h-4 w-4 mr-2 text-primary" />
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm shadow-sm">{skill}</Badge>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-3 flex items-center">
            <BookOpen className="h-4 w-4 mr-2 text-primary" />
            Courses
          </h3>
          <ul className="space-y-1 list-disc list-inside text-foreground/90">
            {user.courses.map((course) => (
              <li key={course}>{course}</li>
            ))}
          </ul>
        </div>

        {user.groupMemberships && user.groupMemberships.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-3 flex items-center">
              <Users className="h-4 w-4 mr-2 text-primary" />
              Group Memberships
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.groupMemberships.map((groupName) => (
                <Badge key={groupName} variant="outline" className="text-sm shadow-sm">{groupName}</Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
