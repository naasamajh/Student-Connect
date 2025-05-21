
"use client";

import { useState, useEffect } from "react";
import { GroupCard } from "@/components/group-card";
import { GroupForm } from "@/components/group-form";
import { mockGroups as initialGroups, mockUserProfiles } from "@/lib/mock-data";
import type { Group, UserProfile } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle, Search, Users, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function GroupsPage() {
  const { currentUser, loading: authLoading } = useAuth();
  const [groups, setGroups] = useState<Group[]>(initialGroups.map(g => ({...g, members: g.memberIds.map(id => mockUserProfiles.find(p => p.id === id) as UserProfile).filter(Boolean)})));
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const { toast } = useToast();

  const handleSaveGroup = async (groupData: Omit<Group, 'id' | 'members' | 'memberIds'> & { id?: string, memberIds: string[], createdBy: string }) => {
    setIsLoadingForm(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const members = groupData.memberIds.map(id => mockUserProfiles.find(p => p.id === id) as UserProfile).filter(Boolean);

    if (groupData.id) { 
      setGroups(prevGroups => prevGroups.map(g => g.id === groupData.id ? { ...g, ...groupData, members, memberIds: groupData.memberIds } : g));
      const groupIndex = initialGroups.findIndex(g => g.id === groupData.id);
      if (groupIndex !== -1) initialGroups[groupIndex] = { ...initialGroups[groupIndex], ...groupData, members, memberIds: groupData.memberIds };
      toast({ title: "Group Updated", description: `${groupData.name} has been updated.` });
    } else { 
      const newGroup: Group = {
        ...groupData,
        id: `group${Date.now()}`, 
        members,
      };
      setGroups(prevGroups => [newGroup, ...prevGroups]);
      initialGroups.unshift(newGroup); // Update mock data source
      toast({ title: "Group Created", description: `${newGroup.name} has been created successfully.` });
    }
    setIsLoadingForm(false);
    setIsFormOpen(false);
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.interests.some(interest => interest.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-xl text-muted-foreground">Loading groups...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 bg-card rounded-lg shadow">
        <div className="flex items-center gap-2">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Interest Groups</h1>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-full md:w-[250px] lg:w-[300px]"
            />
          </div>
          {currentUser && (
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button className="shadow-md">
                  <PlusCircle className="mr-2 h-4 w-4" /> Create Group
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Create New Group</DialogTitle>
                </DialogHeader>
                <GroupForm 
                  onSave={handleSaveGroup} 
                  isLoading={isLoadingForm} 
                  currentUserId={currentUser.id} 
                />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {filteredGroups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map(group => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground">No groups found.</p>
          {searchTerm && <p className="text-sm text-muted-foreground">Try adjusting your search terms.</p>}
        </div>
      )}
    </div>
  );
}
