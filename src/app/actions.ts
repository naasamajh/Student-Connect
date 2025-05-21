
"use server";

import { 
  generateConnectionSuggestion as genkitGenerateSuggestion, 
  type GenerateConnectionSuggestionInput, 
  type GenerateConnectionSuggestionOutput 
} from "@/ai/flows/generate-connection-suggestion";
import { mockUserProfiles, mockGroups } from "@/lib/mock-data"; // For simulating data access
// Note: currentUser from mock-data is no longer the primary source of truth for the logged-in user in the app.
// AuthContext now manages the authenticated user.

export async function fetchConnectionSuggestions(input: GenerateConnectionSuggestionInput): Promise<GenerateConnectionSuggestionOutput> {
  // In a real app, you might add authentication/authorization checks here,
  // possibly using the authenticated user's ID from a session or token.
  try {
    const suggestions = await genkitGenerateSuggestion(input);
    return suggestions;
  } catch (error) {
    console.error("Error generating connection suggestions:", error);
    return { connectionSuggestions: "Apologies, we couldn't generate suggestions at this time. Please try again later." };
  }
}

// This function might be deprecated or refactored if currentUser is always from AuthContext.
// If needed for server-side logic where AuthContext isn't available,
// you'd typically get the user from a server-side session/token.
// For now, it remains as is, but its usage context changes.
export async function getCurrentUserServer() {
  // This would need to be replaced with actual server-side auth logic
  // e.g., verifying a token and fetching user from DB.
  // Returning a mock user here is not representative of a real auth system.
  console.warn("getCurrentUserServer is returning mock data and should be integrated with actual server-side authentication.");
  return mockUserProfiles[0]; // Placeholder, replace with actual auth logic
}

export async function getGroupMembers(groupId: string) {
  const group = mockGroups.find(g => g.id === groupId);
  if (!group) return [];
  return group.memberIds.map(id => mockUserProfiles.find(p => p.id === id)).filter(Boolean);
}
