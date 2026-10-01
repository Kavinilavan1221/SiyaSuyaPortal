'use server';

/**
 * @fileOverview Automatically generates SEO-optimized metadata and social preview images for each product using AI.
 *
 * - generateSeoMetadata - A function that handles the generation of SEO metadata and social preview images.
 * - GenerateSeoMetadataInput - The input type for the generateSeoMetadata function.
 * - GenerateSeoMetadataOutput - The return type for the generateSeoMetadata function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSeoMetadataInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  productDescription: z.string().describe('A detailed description of the product.'),
  keywords: z.string().describe('Comma separated keywords related to the product.'),
});
export type GenerateSeoMetadataInput = z.infer<typeof GenerateSeoMetadataInputSchema>;

const GenerateSeoMetadataOutputSchema = z.object({
  seoTitle: z.string().describe('The SEO title for the product page.'),
  seoDescription: z.string().describe('The SEO description for the product page.'),
  socialPreviewImage: z
    .string()
    .describe(
      'A data URI containing a Base64 encoded image that serves as the social preview image for the product. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' and should be of type image/png.
    ),
});
export type GenerateSeoMetadataOutput = z.infer<typeof GenerateSeoMetadataOutputSchema>;

export async function generateSeoMetadata(input: GenerateSeoMetadataInput): Promise<GenerateSeoMetadataOutput> {
  return generateSeoMetadataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSeoMetadataPrompt',
  input: {schema: GenerateSeoMetadataInputSchema},
  output: {schema: GenerateSeoMetadataOutputSchema},
  prompt: `You are an SEO expert specializing in generating metadata and social preview images for product pages.

  Based on the provided product name, description, and keywords, generate an SEO title, SEO description, and a prompt for generating a social preview image.

  Product Name: {{{productName}}}
  Product Description: {{{productDescription}}}
  Keywords: {{{keywords}}}

  SEO Title (Keep it under 60 characters):
  SEO Description (Keep it under 160 characters):
  Social Preview Image Prompt (a detailed text prompt to generate an image using the stable diffusion model. The image should be related to the product and suitable for sharing on social media.  The image should have the company logo and tagline).
  `,
});

const generateSeoMetadataFlow = ai.defineFlow(
  {
    name: 'generateSeoMetadataFlow',
    inputSchema: GenerateSeoMetadataInputSchema,
    outputSchema: GenerateSeoMetadataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);

    const imageGenResult = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: `${output!.socialPreviewImage} Include the company logo \"Siya Suya International\" and tagline \"Harvesting the Ocean’s Best, Delivering Worldwide.\"`,
    });

    return {
      seoTitle: output!.seoTitle,
      seoDescription: output!.seoDescription,
      socialPreviewImage: imageGenResult.media!.url,
    };
  }
);
