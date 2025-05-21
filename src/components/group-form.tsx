"use client";

import { useState, useEffect } from "react";
import type { Group, UserProfile } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save, Loader2, X, PlusCircle } from "lucide-react";
import { Badge } from "./ui/badge";
import { currentUser } from "@/lib/mock-data"; // Assuming current user is needed to set 'createdBy'

interface GroupFormProps {
  group?: Group; // Optional: for editing an existing group
  onSave: (groupData: Omit<Group, 'id' | 'members' | 'memberIds'> & { id?: string, memberIds: string[] }) => Promise<void>;
  isLoading: boolean;
}

const initialGroupState: Omit<Group, 'id' | 'members' | 'memberIds' | 'createdBy'> = {
  name: "",
  description: "",
  interests: [],
  imageUrl: "",
};

export function GroupForm({ group, onSave, isLoading }: GroupFormProps) {
  const [formData, setFormData] = useState(group ? { ...group } : { ...initialGroupState, createdBy: currentUser.id, memberIds: [currentUser.id] });
  const [currentInterest, setCurrentInterest] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (group) {
      setFormData({ ...group });
    } else {
      // For new groups, ensure createdBy and initial member (creator) is set
      setFormData(prev => ({ ...prev, createdBy: currentUser.id, memberIds: Array.from(new Set([...(prev.memberIds || []), currentUser.id])) }));
    }
  }, [group]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddInterest = () => {
    if (currentInterest.trim() && !formData.interests.includes(currentInterest.trim())) {
      setFormData(prev => ({ ...prev, interests: [...prev.interests, currentInterest.trim()] }));
      setCurrentInterest("");
    }
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    setFormData(prev => ({ ...prev, interests: prev.interests.filter(interest => interest !== interestToRemove) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Group name and description are required.",
        variant: "destructive",
      });
      return;
    }
    
    const dataToSave: Omit<Group, 'id' | 'members'> & { id?: string } = {
      name: formData.name,
      description: formData.description,
      interests: formData.interests,
      imageUrl: formData.imageUrl,
      createdBy: formData.createdBy || currentUser.id,
      memberIds: formData.memberIds || [currentUser.id]
    };
    if (group?.id) {
      dataToSave.id = group.id;
    }

    await onSave(dataToSave);
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">{group ? "Edit Group" : "Create New Group"}</CardTitle>
        <CardDescription>{group ? "Update the details of your group." : "Start a new community for students with shared interests."}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Group Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL (Optional)</Label>
            <Input id="imageUrl" name="imageUrl" value={formData.imageUrl || ""} onChange={handleChange} placeholder="https://example.com/group-image.png" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interests">Interests</Label>
            <div className="flex gap-2">
              <Input
                id="currentInterest"
                value={currentInterest}
                onChange={(e) => setCurrentInterest(e.target.value)}
                placeholder="Add an interest (e.g., Coding)"
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddInterest();}}}
              />
              <Button type="button" variant="outline" onClick={handleAddInterest}><PlusCircle className="mr-2 h-4 w-4" />Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.interests.map((interest) => (
                <Badge key={interest} variant="secondary" className="flex items-center gap-1 pr-1">
                  {interest}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 rounded-full hover:bg-destructive/20"
                    onClick={() => handleRemoveInterest(interest)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isLoading} className="shadow-md">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {group ? "Save Changes" : "Create Group"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
