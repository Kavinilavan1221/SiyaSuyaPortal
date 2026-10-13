import { z } from 'zod';

export type Product = {
  id: string;
  name: string;
  category: 'Shrimp' | 'Squid' | 'Cuttlefish' | 'Tuna' | 'Crab' | 'Other';
  description: string;
  sizes: string;
  packaging: string;
  imageId: string;
};

export type Certification = {
  name: string;
  description: string;
  logoUrl?: string;
};

export type Inquiry = {
  id: string;
  name: string;
  company: string;
  email: string;
  country: string;
  products: string[];
  message: string;
  createdAt: Date;
};

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const InquirySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  company: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  country: z.string().min(2, { message: "Please enter a country." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(1000),
  productInterests: z.string().optional(),
});

export const ContactSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(1000),
});

export type ProductFormValues = {
  name: string;
  category: Product['category'];
  description: string;
  sizes: string;
  packaging: string;
  imageFile?: File | null;
  imageUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  socialPreviewImage?: string;
};
