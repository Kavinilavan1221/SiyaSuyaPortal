import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import ProductCard from '@/components/product-card';
import { featuredProducts, certifications, placeholderImages } from '@/lib/placeholder-data';

const heroImage = placeholderImages.find(p => p.id === 'hero');
const aboutImage = placeholderImages.find(p => p.id === 'factory-1');

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white">
        {heroImage && (
          <img
            src={heroImage.imageUrl}
            alt={heroImage.description}
            className="absolute inset-0 w-full h-full object-cover"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 p-4 max-w-4xl">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Siya Suya International
          </h1>
          <p className="mt-4 text-lg md:text-2xl font-light">
            Harvesting the Ocean’s Best, Delivering Worldwide.
          </p>
          <Button asChild className="mt-8" size="lg">
            <Link to="/products">Explore Our Products <ArrowRight className="ml-2" /></Link>
          </Button>
        </div>
      </section>

      {/* About Snippet Section */}
      <section id="about" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="space-y-4">
              <h2 className="font-headline text-3xl md:text-4xl font-semibold text-primary">
                Your Trusted Partner in Premium Seafood
              </h2>
              <p className="text-lg text-muted-foreground">
                Siya Suya International is a premier Sri Lankan seafood exporter, dedicated to delivering the freshest, highest-quality products from the Indian Ocean to tables across Europe, Japan, and the Middle East.
              </p>
              <p className="text-muted-foreground">
                With a steadfast commitment to quality, freshness, and trust, we leverage state-of-the-art processing facilities and a deep understanding of the global seafood market to exceed our clients' expectations.
              </p>
              <Button asChild variant="outline">
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              {aboutImage && (
                <img
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  width="600"
                  height="400"
                  className="w-full h-auto object-cover"
                  data-ai-hint={aboutImage.imageHint}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="products" className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-semibold text-primary mb-4">
            Featured Seafood Selection
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
            A glimpse into our diverse range of premium seafood products, sought after for their exceptional taste and quality.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="quality" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-semibold text-primary">
              Committed to Uncompromising Quality
            </h2>
            <p className="max-w-3xl mx-auto text-muted-foreground mt-4">
              Our operations adhere to the highest international standards, ensuring that every product we export is safe, fresh, and of the finest quality.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {certifications.map((cert) => (
              <div key={cert.name} className="flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <ShieldCheck className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{cert.name}</h3>
                <p className="text-sm text-muted-foreground">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-accent/10">
        <div className="container mx-auto px-4 text-center">
          <Card className="max-w-3xl mx-auto bg-white dark:bg-card shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-3xl text-primary">Ready to Source the Finest Seafood?</CardTitle>
              <CardDescription className="text-lg mt-2">
                Let us know your requirements, and our team will provide a customized quotation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/inquiry">Request a Quote <ArrowRight className="ml-2" /></Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
