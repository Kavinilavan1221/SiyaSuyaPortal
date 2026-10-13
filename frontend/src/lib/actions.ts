'use server';

import { z } from 'zod';
import { InquirySchema, ContactSchema } from './definitions';

export type FormState = {
  message: string;
  success: boolean;
};

export async function submitInquiry(prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    const parsedData = InquirySchema.parse({
      name: formData.get('name'),
      company: formData.get('company'),
      email: formData.get('email'),
      country: formData.get('country'),
      message: formData.get('message'),
      productInterests: formData.get('productInterests'),
    });

    console.log('New Inquiry Submitted:', parsedData);
    
    // Here you would typically:
    // 1. Save the inquiry to your database
    // 2. Send an email notification to the admin
    // e.g., await db.insert(inquiries).values(parsedData);
    // e.g., await sendAdminNotificationEmail(parsedData);

    return {
      message: 'Thank you for your inquiry! We will get back to you shortly.',
      success: true,
    };
  } catch (e) {
    if (e instanceof z.ZodError) {
      // This is a simplified error message. In a real app, you might want to
      // return a structured error object for field-specific messages.
      return {
        message: 'Invalid form data. Please check your entries and try again.',
        success: false,
      };
    }
    console.error('An unexpected error occurred:', e);
    return {
      message: 'An unexpected error occurred. Please try again later.',
      success: false,
    };
  }
}

export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
    try {
      const parsedData = ContactSchema.parse({
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
      });
  
      console.log('New Contact Form Submission:', parsedData);
      
      // Similar to the inquiry form, save to DB and/or send an email
  
      return {
        message: 'Thank you for contacting us! We will respond as soon as possible.',
        success: true,
      };
    } catch (e) {
      if (e instanceof z.ZodError) {
        return {
          message: 'Invalid form data. Please check your entries and try again.',
          success: false,
        };
      }
      console.error('An unexpected error occurred:', e);
      return {
        message: 'An unexpected error occurred. Please try again later.',
        success: false,
      };
    }
  }
