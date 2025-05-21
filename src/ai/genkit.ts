import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  // Updated to a known valid and recent model.
  // The 'googleai/' prefix indicates the provider.
  model: 'googleai/gemini-1.5-flash-latest',
});
