"use client"; // Required because we use useState for form and onSave simulation

import { useState } from 'react';
import { UserProfileCard } from "@/components/user-profile-card";
import { ProfileForm } from "@/components/profile-form";
import { currentUser as initialUser } from "@/lib/mock-data";
import type { UserProfile } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircle2, Edit3 } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile>(initialUser);

  // Simulate saving the profile
  const handleSaveProfile = async (updatedProfile: UserProfile) => {
    console.log("Saving profile:", updatedProfile);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser(updatedProfile);
    // In a real app, you would make an API call here
    // and handle success/error states.
  };

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
