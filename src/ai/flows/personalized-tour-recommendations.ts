'use server';

/**
 * @fileOverview Provides personalized tour recommendations based on user interests and past travel history.
 *
 * - personalizedTourRecommendations - A function that takes user preferences and history, and returns a list of tour recommendations.
 * - PersonalizedTourRecommendationsInput - The input type for the personalizedTourRecommendations function.
 * - PersonalizedTourRecommendationsOutput - The return type for the personalizedTourRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedTourRecommendationsInputSchema = z.object({
  interests: z
    .string()
    .describe("A comma-separated list of the user's travel interests (e.g., 'history,beaches,food')."),
  pastTravelHistory: z
    .string()
    .describe(
      'A description of the user\'s past travel history, including destinations and activities.'
    ),
  numRecommendations: z
    .number()
    .default(3)
    .describe('The number of tour recommendations to return.'),
});
export type PersonalizedTourRecommendationsInput = z.infer<
  typeof PersonalizedTourRecommendationsInputSchema
>;

const PersonalizedTourRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      tourName: z.string().describe('The name of the tour.'),
      description: z.string().describe('A brief description of the tour.'),
      imageUrl: z.string().describe('URL of an image representing the tour.'),
      price: z.number().describe('The price of the tour.'),
    })
  ).describe('A list of personalized tour recommendations.'),
});
export type PersonalizedTourRecommendationsOutput = z.infer<
  typeof PersonalizedTourRecommendationsOutputSchema
>;

export async function personalizedTourRecommendations(
  input: PersonalizedTourRecommendationsInput
): Promise<PersonalizedTourRecommendationsOutput> {
  return personalizedTourRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedTourRecommendationsPrompt',
  input: {schema: PersonalizedTourRecommendationsInputSchema},
  output: {schema: PersonalizedTourRecommendationsOutputSchema},
  prompt: `You are a tour recommendation expert. Based on the user's interests and past travel history, recommend {{numRecommendations}} tours.

Interests: {{{interests}}}
Past Travel History: {{{pastTravelHistory}}}

Format your response as a JSON object matching the schema. Each tour should include a name, a brief description, the url of an image and the price.
`,
});

const personalizedTourRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedTourRecommendationsFlow',
    inputSchema: PersonalizedTourRecommendationsInputSchema,
    outputSchema: PersonalizedTourRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
