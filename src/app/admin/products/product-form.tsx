'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { products } from '@/lib/placeholder-data';
import { ProductFormValues } from '@/lib/definitions';
import { enhanceProductImage } from '@/ai/flows/enhance-product-images';
import { generateSeoMetadata } from '@/ai/flows/generate-seo-metadata';
import { Sparkles, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const ProductFormSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters.'),
  category: z.enum(['Shrimp', 'Squid', 'Cuttlefish', 'Tuna', 'Crab', 'Other']),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  sizes: z.string().min(3, 'Sizes must be specified.'),
  packaging: z.string().min(3, 'Packaging details are required.'),
  imageFile: z.any().optional(),
  imageUrl: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  socialPreviewImage: z.string().optional(),
});

interface ProductFormProps {
  product?: ProductFormValues;
}

export function ProductForm({ product }: ProductFormProps) {
  const navigate = useNavigate();
  const router = { push: navigate };
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(product?.imageUrl || null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  
  const [isGeneratingSeo, setIsGeneratingSeo] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: product || {
      name: '',
      category: 'Shrimp',
      description: '',
      sizes: '',
      packaging: '',
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('imageFile', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setEnhancedImage(null); // Reset enhanced image when new one is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEnhanceImage = async () => {
    if (!imagePreview) {
        toast({ title: "No Image", description: "Please upload an image first.", variant: "destructive" });
        return;
    }
    setIsEnhancing(true);
    try {
        const result = await enhanceProductImage({ productImageUri: imagePreview });
        setEnhancedImage(result.enhancedImageUri);
        toast({ title: "Success", description: "Image enhancement complete." });
    } catch (error) {
        console.error("Image enhancement failed:", error);
        toast({ title: "Error", description: "Failed to enhance image.", variant: "destructive" });
    } finally {
        setIsEnhancing(false);
    }
  };

  const handleGenerateSeo = async () => {
    const { name, description } = form.getValues();
    if (!name || !description) {
        toast({ title: "Missing Content", description: "Please enter a product name and description first.", variant: "destructive"});
        return;
    }
    setIsGeneratingSeo(true);
    try {
        const result = await generateSeoMetadata({ productName: name, productDescription: description, keywords: form.getValues().category });
        form.setValue('seoTitle', result.seoTitle);
        form.setValue('seoDescription', result.seoDescription);
        form.setValue('socialPreviewImage', result.socialPreviewImage);
        toast({ title: "Success", description: "SEO metadata generated successfully." });
    } catch (error) {
        console.error("SEO generation failed:", error);
        toast({ title: "Error", description: "Failed to generate SEO metadata.", variant: "destructive" });
    } finally {
        setIsGeneratingSeo(false);
    }
  };

  const onSubmit = (data: ProductFormValues) => {
    console.log('Form Submitted', data);
    toast({
      title: 'Product Saved!',
      description: `${data.name} has been successfully saved.`,
    });
    router.push('/admin/products');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>Enter the main information about the product.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl><Input placeholder="e.g., Head-On, Shell-On Black Tiger Shrimp" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl><Textarea placeholder="Describe the product's features, taste, and texture." rows={5} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="sizes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sizes</FormLabel>
                        <FormControl><Input placeholder="e.g., 13/15, 16/20 pcs/kg" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="packaging"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Packaging</FormLabel>
                        <FormControl><Input placeholder="e.g., 1kg box, 10 boxes/carton" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className='flex justify-between items-center'>
                    <div>
                        <CardTitle>AI-Powered SEO</CardTitle>
                        <CardDescription>Automatically generate SEO metadata and social media images.</CardDescription>
                    </div>
                    <Button type="button" onClick={handleGenerateSeo} disabled={isGeneratingSeo}>
                        {isGeneratingSeo ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        Generate with AI
                    </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="seoTitle" render={({ field }) => (
                    <FormItem><FormLabel>SEO Title</FormLabel><FormControl><Input placeholder="SEO-friendly title" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="seoDescription" render={({ field }) => (
                    <FormItem><FormLabel>SEO Description</FormLabel><FormControl><Textarea placeholder="SEO-friendly description for search engines." {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="socialPreviewImage" render={({ field }) => (
                    <FormItem><FormLabel>Social Media Preview Image</FormLabel>
                        {field.value && <img src={field.value} alt="Social preview" width="400" height="200" className="rounded-md border object-cover" />}
                        <FormControl><Input type="hidden" {...field} /></FormControl>
                    <FormMessage /></FormItem>
                )}/>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Category</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                        <SelectContent>
                          {['Shrimp', 'Squid', 'Cuttlefish', 'Tuna', 'Crab', 'Other'].map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Product Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="imageFile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Image</FormLabel>
                      <FormControl><Input type="file" accept="image/*" onChange={handleImageChange} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {imagePreview && (
                    <div className="space-y-4">
                        <Separator />
                        <h3 className="text-sm font-medium">Image Preview</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-muted-foreground mb-2">Original</p>
                                <img src={imagePreview} alt="Original preview" width="200" height="200" className="rounded-md border object-cover aspect-square" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground mb-2">AI Enhanced</p>
                                {enhancedImage ? (
                                    <img src={enhancedImage} alt="Enhanced preview" width="200" height="200" className="rounded-md border object-cover aspect-square" />
                                ) : (
                                    <div className="aspect-square w-full bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center text-xs text-muted-foreground">
                                        {isEnhancing ? <Loader2 className="h-6 w-6 animate-spin" /> : "Click 'Enhance'"}
                                    </div>
                                )}
                            </div>
                        </div>
                         <Button type="button" size="sm" variant="secondary" onClick={handleEnhanceImage} disabled={isEnhancing} className="w-full">
                            {isEnhancing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                            Enhance with AI
                        </Button>
                        {enhancedImage && (
                            <Button type="button" size="sm" onClick={() => { setImagePreview(enhancedImage); setEnhancedImage(null); form.setValue('imageUrl', enhancedImage); toast({description: 'Enhanced image set as primary.'})}} className="w-full">
                                Use Enhanced Image
                            </Button>
                        )}
                    </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.push('/admin/products')}>Cancel</Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Saving...' : 'Save Product'}
            </Button>
        </div>
      </form>
    </Form>
  );
}
