'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { submitContactForm, type FormState } from '@/lib/actions';
import { ContactSchema } from '@/lib/definitions';
import { placeholderImages } from '@/lib/placeholder-data';

const mapImage = placeholderImages.find(p => p.id === 'contact-map');

export default function ContactPage() {
    const [state, setState] = useState({
        message: '',
        success: false,
    });
    
    const form = useForm<z.infer<typeof ContactSchema>>({
        resolver: zodResolver(ContactSchema),
        defaultValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
    });

    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    
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

    const handleFormSubmit = async (data: z.infer<typeof ContactSchema>) => {
        setState({ message: 'Opening email client...', success: false });
        try {
            const subject = encodeURIComponent(data.subject || 'New message from SiyaSuyaPortal');
            const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`);
            window.location.href = `mailto:kavin200212@gmail.com?subject=${subject}&body=${body}`;
            
            setState({ message: 'Email client opened successfully!', success: true });
        } catch (error) {
            setState({ message: 'Failed to open email client', success: false });
        }
    };

  return (
    <div className="bg-background relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-accent/20 blur-[120px]" />
      </div>

      {/* Page Header */}
      <section className="relative z-10 pt-24 pb-16 md:pt-32 md:pb-24 text-center px-4">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary tracking-wide shadow-sm">
          Let's Connect
        </div>
        <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-foreground tracking-tight mb-6">
          Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Conversation</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
          Whether you're looking to source the finest seafood or simply have a question, our team is ready to assist you anywhere in the world.
        </p>
      </section>

      {/* Contact Details and Form */}
      <section className="relative z-10 pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-start max-w-7xl mx-auto">
            
            {/* Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="group flex items-start gap-6 p-6 md:p-8 rounded-3xl bg-card/60 backdrop-blur-xl border border-white/10 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground p-4 rounded-2xl text-primary transition-all duration-500 group-hover:scale-110">
                  <MapPin className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Global Headquarters</h3>
                  <p className="text-muted-foreground leading-relaxed">123 Seafood Lane<br/>Colombo, Sri Lanka</p>
                </div>
              </div>

              <div className="group flex items-start gap-6 p-6 md:p-8 rounded-3xl bg-card/60 backdrop-blur-xl border border-white/10 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground p-4 rounded-2xl text-primary transition-all duration-500 group-hover:scale-110">
                  <Phone className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Call Us Directly</h3>
                  <a href="tel:+94112345678" className="text-muted-foreground hover:text-accent transition-colors block text-lg">
                    +94 11 234 5678
                  </a>
                </div>
              </div>

              <div className="group flex items-start gap-6 p-6 md:p-8 rounded-3xl bg-card/60 backdrop-blur-xl border border-white/10 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground p-4 rounded-2xl text-primary transition-all duration-500 group-hover:scale-110">
                  <Mail className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Email Support</h3>
                  <a href="mailto:info@siyasuya.com" className="text-muted-foreground hover:text-primary transition-colors block text-lg">
                    info@siyasuya.com
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-2xl rounded-3xl overflow-hidden">
                <div className="h-2 w-full bg-gradient-to-r from-primary via-accent to-primary" />
                <CardContent className="p-8 md:p-12">
                  <h2 className="text-2xl font-bold mb-8">Send us a Message</h2>
                  <Form {...form}>
                    <form
                      ref={formRef}
                      onSubmit={form.handleSubmit(handleFormSubmit)}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-muted-foreground uppercase text-xs tracking-wider font-semibold">Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" className="bg-background/50 border-0 border-b-2 border-muted focus-visible:ring-0 focus-visible:border-primary rounded-none px-0 text-lg transition-all" {...field} />
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
                              <FormLabel className="text-muted-foreground uppercase text-xs tracking-wider font-semibold">Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="you@example.com" className="bg-background/50 border-0 border-b-2 border-muted focus-visible:ring-0 focus-visible:border-primary rounded-none px-0 text-lg transition-all" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-muted-foreground uppercase text-xs tracking-wider font-semibold">Subject</FormLabel>
                              <FormControl>
                                <Input placeholder="Regarding product availability" className="bg-background/50 border-0 border-b-2 border-muted focus-visible:ring-0 focus-visible:border-primary rounded-none px-0 text-lg transition-all" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground uppercase text-xs tracking-wider font-semibold">Your Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please let us know how we can help..."
                                className="min-h-[150px] bg-background/50 border-2 border-muted focus-visible:ring-0 focus-visible:border-primary rounded-2xl resize-none text-lg p-4 transition-all"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-14 text-lg font-semibold shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-1" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative z-10">
        <div className="container mx-auto px-4 pb-16 md:pb-32">
            <div className="max-w-7xl mx-auto relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                {mapImage && (
                    <div className="relative aspect-[21/9] md:aspect-[24/7] w-full rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-card">
                        <img
                            src="/cargo-ship.jpg"
                            alt="Deep blue ocean waters"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            data-ai-hint={mapImage.imageHint}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent pointer-events-none" />
                        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 pointer-events-none">
                            <h2 className="font-headline text-3xl md:text-5xl font-bold text-foreground">Find Us Here</h2>
                            <p className="text-muted-foreground mt-2 text-lg">Heart of the Indian Ocean</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </section>
    </div>
  );
}
