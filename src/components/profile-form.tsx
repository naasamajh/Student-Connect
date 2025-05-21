"use client";

import { useState } from "react";
import type { UserProfile } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save, Loader2, X } from "lucide-react";
import { Badge } from "./ui/badge";

interface ProfileFormProps {
  user: UserProfile;
  onSave: (updatedProfile: UserProfile) => Promise<void>; // Simulate save
}

export function ProfileForm({ user, onSave }: ProfileFormProps) {
  const [formData, setFormData] = useState<UserProfile>(user);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [currentInterest, setCurrentInterest] = useState("");
  const [currentSkill, setCurrentSkill] = useState("");
  const [currentCourse, setCurrentCourse] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddItem = (field: keyof Pick<UserProfile, "interests" | "skills" | "courses">, value: string) => {
    if (value.trim() === "") return;
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), value.trim()]
    }));
    if (field === "interests") setCurrentInterest("");
    if (field === "skills") setCurrentSkill("");
    if (field === "courses") setCurrentCourse("");
  };

  const handleRemoveItem = (field: keyof Pick<UserProfile, "interests" | "skills" | "courses">, itemToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] || []).filter(item => item !== itemToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSave(formData);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderListEditor = (
    label: string, 
    fieldKey: keyof Pick<UserProfile, "interests" | "skills" | "courses">, 
    currentValue: string, 
    setter: (val: string) => void
  ) => (
    <div className="space-y-2">
      <Label htmlFor={fieldKey}>{label}</Label>
      <div className="flex gap-2">
        <Input
          id={fieldKey}
          value={currentValue}
          onChange={(e) => setter(e.target.value)}
          placeholder={`Add a ${label.toLowerCase().slice(0, -1)}`}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddItem(fieldKey, currentValue);}}}
        />
        <Button type="button" variant="outline" onClick={() => handleAddItem(fieldKey, currentValue)}>Add</Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {formData[fieldKey]?.map((item) => (
          <Badge key={item} variant="secondary" className="flex items-center gap-1 pr-1">
            {item}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-4 w-4 rounded-full hover:bg-destructive/20"
              onClick={() => handleRemoveItem(fieldKey, item)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  );


  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Edit Profile</CardTitle>
        <CardDescription>Update your personal information, interests, skills, and courses.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="avatarUrl">Avatar URL</Label>
            <Input id="avatarUrl" name="avatarUrl" value={formData.avatarUrl || ""} onChange={handleChange} placeholder="https://example.com/avatar.png"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" name="bio" value={formData.bio || ""} onChange={handleChange} rows={4} />
          </div>
          
          {renderListEditor("Interests", "interests", currentInterest, setCurrentInterest)}
          {renderListEditor("Skills", "skills", currentSkill, setCurrentSkill)}
          {renderListEditor("Courses", "courses", currentCourse, setCurrentCourse)}

        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isLoading} className="shadow-md">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Changes
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
