'use server';

/**
 * @fileOverview This file defines a Genkit flow for routing user queries to the appropriate department or agent.
 *
 * - routeUserQuery - A function that analyzes a user query and determines the best department to route it to.
 * - RouteUserQueryInput - The input type for the routeUserQuery function.
 * - RouteUserQueryOutput - The return type for the routeUserQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RouteUserQueryInputSchema = z.object({
  query: z.string().describe('The user query from the contact form.'),
});
export type RouteUserQueryInput = z.infer<typeof RouteUserQueryInputSchema>;

const RouteUserQueryOutputSchema = z.object({
  department: z.string().describe('The department to route the query to.'),
  agent: z.string().optional().describe('The specific agent to route the query to, if applicable.'),
  reason: z.string().describe('The reasoning behind the routing decision.'),
});
export type RouteUserQueryOutput = z.infer<typeof RouteUserQueryOutputSchema>;

export async function routeUserQuery(input: RouteUserQueryInput): Promise<RouteUserQueryOutput> {
  return routeUserQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'routeUserQueryPrompt',
  input: {schema: RouteUserQueryInputSchema},
  output: {schema: RouteUserQueryOutputSchema},
  prompt: `You are an AI assistant responsible for routing user queries to the appropriate department or agent.

  Analyze the following query and determine the best department to handle it. If possible, also identify a specific agent within that department who is best suited to respond.

  Query: {{{query}}}

  Departments:
  - Sales
  - Support
  - Claims
  - Billing

  Output a JSON object with the department, agent (if applicable), and reasoning for the routing decision.

  {{ zodSchema }}`,
});

const routeUserQueryFlow = ai.defineFlow(
  {
    name: 'routeUserQueryFlow',
    inputSchema: RouteUserQueryInputSchema,
    outputSchema: RouteUserQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
