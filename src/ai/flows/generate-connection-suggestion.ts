'use server';

/**
 * @fileOverview AI flow to generate connection suggestions for students.
 *
 * - generateConnectionSuggestion - A function that generates connection suggestions for a student.
 * - GenerateConnectionSuggestionInput - The input type for the generateConnectionSuggestion function.
 * - GenerateConnectionSuggestionOutput - The return type for the generateConnectionSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateConnectionSuggestionInputSchema = z.object({
  profileInformation: z
    .string()
    .describe('The profile information of the student, including interests, skills, and course information.'),
  groupMemberships: z
    .string()
    .describe('The group memberships of the student, as a comma separated list of group names.'),
});
export type GenerateConnectionSuggestionInput = z.infer<
  typeof GenerateConnectionSuggestionInputSchema
>;

const GenerateConnectionSuggestionOutputSchema = z.object({
  connectionSuggestions: z
    .string()
    .describe('A list of connection suggestions, with each suggestion including the name, profile overview, and reason for suggestion.'),
});
export type GenerateConnectionSuggestionOutput = z.infer<
  typeof GenerateConnectionSuggestionOutputSchema
>;

export async function generateConnectionSuggestion(
  input: GenerateConnectionSuggestionInput
): Promise<GenerateConnectionSuggestionOutput> {
  return generateConnectionSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateConnectionSuggestionPrompt',
  input: {schema: GenerateConnectionSuggestionInputSchema},
  output: {schema: GenerateConnectionSuggestionOutputSchema},
  prompt: `You are an AI assistant designed to suggest connections between students.

  Based on the student's profile information and group memberships, suggest potential connections with other students.
  Explain why each connection is suggested, highlighting shared interests, skills, or courses.

  Profile Information: {{{profileInformation}}}
  Group Memberships: {{{groupMemberships}}}

  Return a list of connection suggestions, with each suggestion including the name, profile overview, and reason for suggestion.
  Make sure the connection suggestion is less than 200 words.
  Do not suggest connections with the same student who owns the profile information.
  Do not suggest connections with students who are not in the same group.
  Do not suggest connections with students who do not share the same interests or skills.
  Be creative and think outside the box, suggest connections that the student might not have thought of.
  `,
});

const generateConnectionSuggestionFlow = ai.defineFlow(
  {
    name: 'generateConnectionSuggestionFlow',
    inputSchema: GenerateConnectionSuggestionInputSchema,
    outputSchema: GenerateConnectionSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
