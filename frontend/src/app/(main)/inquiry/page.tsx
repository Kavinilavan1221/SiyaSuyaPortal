'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams as useRRSearchParams } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { submitInquiry, type FormState } from '@/lib/actions';
import { InquirySchema } from '@/lib/definitions';
import { useToast } from "@/hooks/use-toast";
import { products } from '@/lib/placeholder-data';

export default function InquiryPage() {
  const [state, setState] = useState({
    message: '',
    success: false,
  });

  const form = useForm<z.infer<typeof InquirySchema>>({
    resolver: zodResolver(InquirySchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      country: '',
      message: '',
      productInterests: '',
    },
  });

  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [searchParams] = useRRSearchParams();

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'Success!' : 'Error',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
      if (state.success) {
        form.reset();
      }
    }
  }, [state, toast, form]);

  useEffect(() => {
    const productId = searchParams.get('product');
    if (productId) {
      const productName = products.find(p => p.id === productId)?.name;
      if (productName) {
        form.setValue('message', `I am interested in your product: ${productName}.\n\nPlease provide more information and pricing.`);
        form.setValue('productInterests', productName);
      }
    }
  }, [searchParams, form]);

  const handleFormSubmit = async (data: z.infer<typeof InquirySchema>) => {
      setState({ message: 'Submitting...', success: false });
      try {
          const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
          
          let finalMessage = data.message;
          if (data.productInterests) {
            finalMessage = `Product Interests: ${data.productInterests}\n\n${finalMessage}`;
          }

          const response = await fetch(`${apiUrl}/api/inquiries`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: data.name,
              email: data.email,
              company: data.company,
              country: data.country,
              message: finalMessage
            })
          });
          
          if (!response.ok) {
             const errorData = await response.json().catch(() => ({}));
             throw new Error(errorData.error || 'Failed to submit');
          }
          
          setState({ message: 'Inquiry submitted successfully! We will contact you soon.', success: true });
      } catch (error: any) {
          console.error("Submission error:", error);
          setState({ message: error.message || 'Failed to submit inquiry. Please check your connection.', success: false });
      }
  };


  return (
    <div>
      <section className="py-16 md:py-24 bg-primary/5 text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
            Request a Quotation
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Provide us with your details and product interests, and our team will get back to you with a customized quote.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Inquiry Form</CardTitle>
              <CardDescription>All fields are required.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  ref={formRef}
                  onSubmit={form.handleSubmit(handleFormSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Global Seafood Inc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Japan, France, UAE" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message & Product Interests</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please specify the products, quantities, and any other requirements you have."
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Hidden field for product interests */}
                  <FormField
                    control={form.control}
                    name="productInterests"
                    render={({ field }) => (
                      <FormItem className='hidden'>
                        <FormControl>
                          <Input type="hidden" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
