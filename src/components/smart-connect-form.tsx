"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchConnectionSuggestions } from "@/app/actions";
import type { UserProfile } from "@/lib/types";
import { Loader2, Zap } from "lucide-react";
import { ConnectionSuggestionCard } from "./connection-suggestion-card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface SmartConnectFormProps {
  currentUser: UserProfile;
}

export function SmartConnectForm({ currentUser }: SmartConnectFormProps) {
  const [profileInfo, setProfileInfo] = useState(
    `Interests: ${currentUser.interests.join(", ")}. Skills: ${currentUser.skills.join(", ")}. Courses: ${currentUser.courses.join(", ")}.`
  );
  const [groupMemberships, setGroupMemberships] = useState(
    currentUser.groupMemberships?.join(", ") || "No group memberships specified."
  );
  const [suggestions, setSuggestions] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuggestions(null);

    try {
      const result = await fetchConnectionSuggestions({
        profileInformation: profileInfo,
        groupMemberships: groupMemberships,
      });
      if (result.connectionSuggestions.startsWith("Apologies")) {
        setError(result.connectionSuggestions);
      } else {
        setSuggestions(result.connectionSuggestions);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl">Smart Connect</CardTitle>
        </div>
        <CardDescription>
          Discover new connections! Provide your details or use your current profile information to get AI-powered suggestions.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="profileInfo" className="font-medium">Your Profile Information</Label>
            <Textarea
              id="profileInfo"
              value={profileInfo}
              onChange={(e) => setProfileInfo(e.target.value)}
              rows={4}
              className="bg-muted/30"
              placeholder="E.g., Interests: Hiking, Coding. Skills: Python, JS. Courses: CS101."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="groupMemberships" className="font-medium">Your Group Memberships (comma-separated)</Label>
            <Textarea
              id="groupMemberships"
              value={groupMemberships}
              onChange={(e) => setGroupMemberships(e.target.value)}
              rows={2}
              className="bg-muted/30"
              placeholder="E.g., Coding Club, Photography Club"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isLoading} className="shadow-md">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Zap className="mr-2 h-4 w-4" />
            )}
            {isLoading ? "Generating..." : "Get Suggestions"}
          </Button>
        </CardFooter>
      </form>
      
      {error && (
        <div className="p-4 pt-0">
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {suggestions && !error && (
        <div className="p-4 pt-0">
          <ConnectionSuggestionCard content={suggestions} />
        </div>
      )}
    </Card>
  );
}
