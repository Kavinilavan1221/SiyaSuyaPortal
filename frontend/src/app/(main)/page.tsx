'use client';

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ShieldCheck, Anchor, Fish, Ship } from 'lucide-react';
import ProductCard from '@/components/product-card';
import { featuredProducts, placeholderImages } from '@/lib/placeholder-data';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const aboutImage = placeholderImages.find(p => p.id === 'factory-1');

const heroSlides = [
  "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=1920&q=80"
];

const premiumFeatures = [
  { icon: Anchor, title: 'Sustainable Catch', desc: 'Ethically sourced from pristine deep-sea waters.' },
  { icon: Fish, title: 'Premium Quality', desc: 'Hand-selected grades ensuring perfection in every bite.' },
  { icon: Ship, title: 'Global Export', desc: 'Frozen seafood by sea freight and fresh seafood by air freight.' },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
    if (!localStorage.getItem('loginPromptSeen')) {
      setShowLoginPrompt(true);
    }
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000); 
    return () => clearInterval(timer);
  }, []);

  const dismissLoginPrompt = () => {
    localStorage.setItem('loginPromptSeen', 'true');
    setShowLoginPrompt(false);
  };

  return (
    <div className="flex flex-col bg-background selection:bg-primary/30">
      <Dialog
        open={showLoginPrompt}
        onOpenChange={(open) => {
          if (!open) dismissLoginPrompt();
          else setShowLoginPrompt(true);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome to Siya Suya</DialogTitle>
            <DialogDescription>
              Would you like to sign in, or continue browsing as a guest? Signing in is optional.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={dismissLoginPrompt}>
              Continue as guest
            </Button>
            <Button
              onClick={() => {
                dismissLoginPrompt();
                navigate('/login');
              }}
            >
              Sign in
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Hero Section */}
      <section className="relative h-[90vh] w-full flex items-center justify-center text-center text-white overflow-hidden">
        {heroSlides.map((slide, index) => (
          <img
            key={slide}
            src={slide}
            alt={`Seafood Slide ${index + 1}`}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out scale-105",
              currentSlide === index ? "opacity-100 scale-100" : "opacity-0"
            )}
          />
        ))}
        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-black/40 to-background/90" />
        
        <div className={cn(
          "relative z-10 p-6 max-w-5xl mx-auto flex flex-col items-center transition-all duration-1000 transform",
          mounted ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        )}>
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse"></span>
            <span className="text-sm font-medium tracking-wide text-white">Fresh Ocean Harvest</span>
          </div>
          
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both drop-shadow-2xl">
            The Ocean's Finest, <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">Delivered Worldwide.</span>
          </h1>
          
          <p className="mt-6 text-lg md:text-2xl font-medium text-black max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
            Siya Suya International brings you premium Sri Lankan seafood, with frozen products shipped by sea and fresh products flown to destinations worldwide.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-700 fill-mode-both">
            <Button asChild className="h-14 px-8 shadow-2xl shadow-accent/20 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full text-lg hover:scale-105 transition-transform" size="lg">
              <Link to="/products">View Catalog <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button asChild variant="outline" className="h-14 px-8 rounded-full text-lg bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white hover:scale-105 transition-transform" size="lg">
              <Link to="/inquiry">Request Quote</Link>
            </Button>
          </div>
        </div>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                currentSlide === index ? "bg-accent w-8" : "bg-white/40 hover:bg-white/80 w-4"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Premium Features */}
      <section className="relative overflow-hidden border-b border-border/60 bg-muted/30 py-16 md:py-20">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[min(80%,48rem)] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-primary">
              The Siya Suya difference
            </p>
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Quality you can trust, from ocean to you
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {premiumFeatures.map((feature) => (
              <div
                key={feature.title}
                className="group flex items-start gap-5 rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 md:p-7"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="pt-0.5">
                  <h3 className="font-semibold text-lg text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
        
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary to-accent opacity-20 rounded-3xl blur-2xl group-hover:opacity-40 transition-opacity duration-700" />
              {aboutImage && (
                <img
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/3] group-hover:scale-[1.02] transition-transform duration-500"
                />
              )}
            </div>
            
            <div className="space-y-6 relative">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase">
                Our Legacy
              </div>
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Setting the Benchmark in Seafood Export
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Based in the heart of the Indian Ocean, Siya Suya International is a premier Sri Lankan seafood exporter. We don't just export seafood; we deliver an uncompromising promise of freshness, sustainability, and absolute quality.
              </p>
              <div className="grid grid-cols-2 gap-6 py-6 border-y border-border/50">
                 <div>
                    <div className="text-3xl font-bold text-primary mb-1">10+</div>
                    <div className="text-sm text-muted-foreground font-medium">Years Experience</div>
                 </div>
                 <div>
                    <div className="text-3xl font-bold text-primary mb-1">20+</div>
                    <div className="text-sm text-muted-foreground font-medium">Global Markets</div>
                 </div>
              </div>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground group">
                <Link to="/about">
                  Discover Our Journey <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="products" className="py-24 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-primary text-sm font-semibold tracking-wide uppercase mb-4">
            Premium Selection
          </div>
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground mb-6">
            Explore Our Catalog
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-16 text-lg">
            A curated glimpse into our diverse range of premium seafood products, sought after by top culinary experts globally.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group transition-all duration-500 hover:-translate-y-2">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className="mt-16">
            <Button asChild size="lg" className="rounded-full px-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <Link to="/products">View Full Catalog</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-accent/10 rounded-[100%] blur-[100px]" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <Card className="max-w-4xl mx-auto bg-card/60 backdrop-blur-2xl shadow-2xl border-white/20 dark:border-white/5 overflow-hidden rounded-3xl">
            <div className="h-2 w-full bg-gradient-to-r from-primary via-accent to-primary" />
            <CardHeader className="pt-12 pb-6">
              <ShieldCheck className="w-16 h-16 mx-auto text-accent mb-6" />
              <CardTitle className="font-headline text-4xl md:text-5xl">Ready to Source the Finest?</CardTitle>
              <CardDescription className="text-xl mt-4 text-muted-foreground">
                Connect with our export team for tailored quotations, with frozen seafood shipped by sea and fresh seafood transported by air.
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-12">
              <Button asChild size="lg" className="h-14 px-10 rounded-full text-lg shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 transition-all duration-300">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
