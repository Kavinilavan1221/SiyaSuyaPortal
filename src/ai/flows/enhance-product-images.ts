'use server';

/**
 * @fileOverview Enhances product images using AI to improve visual appeal.
 *
 * - enhanceProductImage - A function to enhance a single product image.
 * - EnhanceProductImageInput - The input type for the enhanceProductImage function.
 * - EnhanceProductImageOutput - The return type for the enhanceProductImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceProductImageInputSchema = z.object({
  productImageUri: z
    .string()
    .describe(
      'The product image as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.')
});
export type EnhanceProductImageInput = z.infer<typeof EnhanceProductImageInputSchema>;

const EnhanceProductImageOutputSchema = z.object({
  enhancedImageUri: z.string().describe('The enhanced product image as a data URI.'),
});
export type EnhanceProductImageOutput = z.infer<typeof EnhanceProductImageOutputSchema>;

export async function enhanceProductImage(input: EnhanceProductImageInput): Promise<EnhanceProductImageOutput> {
  return enhanceProductImageFlow(input);
}

const enhanceProductImagePrompt = ai.definePrompt({
  name: 'enhanceProductImagePrompt',
  input: {schema: EnhanceProductImageInputSchema},
  output: {schema: EnhanceProductImageOutputSchema},
  prompt: [
    {media: {url: '{{{productImageUri}}}'}},
    {text: 'Generate an enhanced version of this product image, improving its visual appeal for potential buyers.'},
  ],
  model: 'googleai/gemini-2.5-flash-image-preview',
  config: {
    responseModalities: ['TEXT', 'IMAGE'],
  },
});

const enhanceProductImageFlow = ai.defineFlow(
  {
    name: 'enhanceProductImageFlow',
    inputSchema: EnhanceProductImageInputSchema,
    outputSchema: EnhanceProductImageOutputSchema,
  },
  async input => {
    const {media} = await enhanceProductImagePrompt(input);
    return {enhancedImageUri: media.url!};
  }
);
