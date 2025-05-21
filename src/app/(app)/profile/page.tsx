
"use client";

import { useState, useEffect } from 'react';
import { UserProfileCard } from "@/components/user-profile-card";
import { ProfileForm } from "@/components/profile-form";
import type { UserProfile } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircle2, Edit3, Loader2 } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const { currentUser, setCurrentUser, loading: authLoading } = useAuth();
  const [user, setUser] = useState<UserProfile | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  const handleSaveProfile = async (updatedProfileData: UserProfile) => {
    if (!currentUser || !user) {
      toast({ title: "Error", description: "No user data found.", variant: "destructive"});
      return;
    }
    
    // Simulate API call delay / Firebase update
    // In a real app:
    // 1. await updateProfile(auth.currentUser, { displayName: updatedProfileData.name, photoURL: updatedProfileData.avatarUrl });
    // 2. await setDoc(doc(db, "users", currentUser.id), updatedProfileData);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedUser = { ...currentUser, ...updatedProfileData };
    setUser(updatedUser); // Update local state for immediate UI refresh
    setCurrentUser(updatedUser); // Update context state
    
    toast({
        title: "Profile Updated",
        description: "Your profile information has been saved.",
      });
  };

  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-xl text-muted-foreground">Loading profile...</p>
      </div>
    );
  }


  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Tabs defaultValue="view" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-1/2 mx-auto mb-6 shadow-sm">
          <TabsTrigger value="view" className="gap-2">
            <UserCircle2 className="h-4 w-4" /> View Profile
          </TabsTrigger>
          <TabsTrigger value="edit" className="gap-2">
            <Edit3 className="h-4 w-4" /> Edit Profile
          </TabsTrigger>
        </TabsList>
        <TabsContent value="view">
          <UserProfileCard user={user} />
        </TabsContent>
        <TabsContent value="edit">
          <ProfileForm user={user} onSave={handleSaveProfile} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
