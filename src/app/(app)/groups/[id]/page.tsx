
"use client";

import { useParams, useRouter } from 'next/navigation';
import { mockGroups, mockUserProfiles, mockEvents } from '@/lib/mock-data';
import type { Group, UserProfile, Event } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Tag, CalendarDays, MessageSquare, UserPlus, Edit3, ArrowLeft, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { GroupForm } from '@/components/group-form';
import { useToast } from '@/hooks/use-toast';
import { EventCard } from '@/components/event-card';
import { useAuth } from '@/contexts/AuthContext'; 

const getInitials = (name: string) => {
  const names = name.split(' ');
  return names.length > 1 ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase() : name.substring(0, 2).toUpperCase();
};

export default function GroupDetailPage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params.id as string;
  const { currentUser, loading: authLoading } = useAuth(); 
  
  const [group, setGroup] = useState<Group | null>(null);
  const [relatedEvents, setRelatedEvents] = useState<Event[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const foundGroup = mockGroups.find(g => g.id === groupId);
    if (foundGroup) {
      const groupWithFullMembers = {
        ...foundGroup,
        members: foundGroup.memberIds.map(id => mockUserProfiles.find(p => p.id === id) as UserProfile).filter(Boolean)
      };
      setGroup(groupWithFullMembers);
      
      const events = mockEvents.filter(event => 
        event.relatedInterests.some(interest => groupWithFullMembers.interests.includes(interest)) || event.organizer === groupWithFullMembers.name
      );
      setRelatedEvents(events);
    }
  }, [groupId]);

  const handleJoinLeaveGroup = () => {
    if (!group || !currentUser) return;
    const isMember = group.memberIds.includes(currentUser.id);
    
    toast({ title: isMember ? "Left Group" : "Joined Group", description: `You have ${isMember ? 'left' : 'joined'} ${group.name}.`});
    
    const updatedMemberIds = isMember 
      ? group.memberIds.filter(id => id !== currentUser.id)
      : [...group.memberIds, currentUser.id];
    
    const updatedMembers = updatedMemberIds.map(id => mockUserProfiles.find(p => p.id === id) as UserProfile).filter(Boolean);
    
    setGroup(prev => prev ? {...prev, memberIds: updatedMemberIds, members: updatedMembers} : null);
    
    const groupIndex = mockGroups.findIndex(g => g.id === groupId);
    if (groupIndex !== -1) {
      mockGroups[groupIndex].memberIds = updatedMemberIds;
      mockGroups[groupIndex].members = updatedMembers;
    }
  };
  
  const handleSaveEditedGroup = async (groupData: Omit<Group, 'id' | 'members'> & { id?: string, memberIds: string[] }) => {
    setIsLoadingForm(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    
    if (group && groupData.id === group.id) {
      const updatedMembers = groupData.memberIds.map(id => mockUserProfiles.find(p => p.id === id) as UserProfile).filter(Boolean);
      const updatedGroupDetails = { ...group, ...groupData, members: updatedMembers };
      setGroup(updatedGroupDetails);
      
      const groupIndex = mockGroups.findIndex(g => g.id === group.id);
      if (groupIndex !== -1) {
        mockGroups[groupIndex] = { ...mockGroups[groupIndex], ...updatedGroupDetails, memberIds: groupData.memberIds };
      }
      toast({ title: "Group Updated", description: `${groupData.name} has been updated successfully.` });
    }
    setIsLoadingForm(false);
    setIsEditing(false);
  };

  const handleOpenChat = () => {
    if (group) {
      router.push(`/messages?chatId=${group.id}`);
    }
  };

  if (authLoading || !group) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-xl text-muted-foreground">Loading group details...</p>
      </div>
    );
  }
  
  const isCreator = currentUser && group.createdBy === currentUser.id;
  const isMember = currentUser && group.memberIds.includes(currentUser.id);

  return (
    <div className="space-y-8">
      <Link href="/groups" className="inline-flex items-center text-sm text-primary hover:underline mb-4">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to All Groups
      </Link>

      <Card className="w-full shadow-xl overflow-hidden">
        <CardHeader className="relative p-0 h-64 md:h-80">
          <Image
            src={group.imageUrl || `https://placehold.co/800x400.png`}
            alt={group.name}
            layout="fill"
            objectFit="cover"
            className="opacity-80"
            data-ai-hint="community gathering"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white shadow-text">{group.name}</h1>
            <div className="mt-2 flex flex-wrap gap-2">
              {group.interests.map(interest => (
                <Badge key={interest} variant="secondary" className="backdrop-blur-sm bg-white/20 text-white border-white/30 text-xs md:text-sm">
                  <Tag className="h-3 w-3 mr-1" /> {interest}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <p className="text-muted-foreground leading-relaxed md:max-w-2xl">{group.description}</p>
            {currentUser && (
              <div className="flex gap-2 flex-shrink-0">
                {isCreator && (
                  <Dialog open={isEditing} onOpenChange={setIsEditing}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="shadow-sm"><Edit3 className="mr-2 h-4 w-4" />Edit Group</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[625px]">
                        <DialogHeader><DialogTitle>Edit Group</DialogTitle></DialogHeader>
                        <GroupForm group={group} onSave={handleSaveEditedGroup} isLoading={isLoadingForm} currentUserId={currentUser.id} />
                      </DialogContent>
                    </Dialog>
                )}
                <Button onClick={handleJoinLeaveGroup} className="shadow-sm bg-primary hover:bg-primary/90">
                    <UserPlus className="mr-2 h-4 w-4" /> {isMember ? 'Leave Group' : 'Join Group'}
                </Button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-muted/30">
              <CardHeader><CardTitle className="text-lg flex items-center"><Users className="mr-2 h-5 w-5 text-primary"/>Members ({group.members.length})</CardTitle></CardHeader>
              <CardContent className="max-h-60 overflow-y-auto space-y-3 pr-2">
                {group.members.map(member => (
                  <Link href={`/profile/${member.id}`} key={member.id} className="flex items-center gap-3 p-2 hover:bg-background rounded-md transition-colors">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatarUrl} alt={member.name} />
                      <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm text-foreground">{member.name}</span>
                  </Link>
                ))}
              </CardContent>
            </Card>

            <Card className="md:col-span-2 bg-muted/30">
              <CardHeader><CardTitle className="text-lg flex items-center"><MessageSquare className="mr-2 h-5 w-5 text-primary"/>Group Chat</CardTitle></CardHeader>
              <CardContent className="h-60 flex flex-col items-center justify-center text-center">
                <p className="text-muted-foreground mb-4">Join the conversation with group members.</p>
                <Button onClick={handleOpenChat} className="w-full md:w-auto">
                  Open Chat
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <CalendarDays className="mr-3 h-6 w-6 text-primary" />
              Related Events
            </h2>
            {relatedEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No related events found for this group.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
