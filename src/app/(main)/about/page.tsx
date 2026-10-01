import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, History, Target, ShieldCheck } from 'lucide-react';
import { certifications, companyProfile, placeholderImages } from '@/lib/placeholder-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Siya Suya International',
    description: 'Learn about our company history, mission, and our commitment to providing the highest quality Sri Lankan seafood to the world.',
};

const factoryImage1 = placeholderImages.find(p => p.id === 'factory-1');
const factoryImage2 = placeholderImages.find(p => p.id === 'factory-2');

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Page Header */}
      <section className="py-16 md:py-24 bg-primary/5 text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
            About Siya Suya International
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our story, our values, and our unwavering commitment to delivering ocean freshness worldwide.
          </p>
        </div>
      </section>

      {/* Company Profile Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <Card className="text-center group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-0 shadow-lg bg-card/60 backdrop-blur-xl">
              <CardHeader className="items-center pb-2">
                <div className="bg-primary/10 p-4 rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 mb-4">
                  <History className="h-10 w-10 text-primary transition-colors group-hover:text-primary-foreground" />
                </div>
                <CardTitle className="font-headline text-2xl font-bold">Our History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{companyProfile.history}</p>
              </CardContent>
            </Card>
            <Card className="text-center group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-0 shadow-lg bg-card/60 backdrop-blur-xl">
              <CardHeader className="items-center pb-2">
                <div className="bg-primary/10 p-4 rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 mb-4">
                  <Target className="h-10 w-10 text-primary transition-colors group-hover:text-primary-foreground" />
                </div>
                <CardTitle className="font-headline text-2xl font-bold">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{companyProfile.mission}</p>
              </CardContent>
            </Card>
            <Card className="text-center group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-0 shadow-lg bg-card/60 backdrop-blur-xl">
              <CardHeader className="items-center pb-2">
                <div className="bg-primary/10 p-4 rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 mb-4">
                  <Globe className="h-10 w-10 text-primary transition-colors group-hover:text-primary-foreground" />
                </div>
                <CardTitle className="font-headline text-2xl font-bold">Export Destinations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{companyProfile.exportDestinations}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Factory & Processing Section */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="order-2 md:order-1 space-y-4">
              <h2 className="font-headline text-3xl md:text-4xl font-semibold text-primary">
                State-of-the-Art Facilities
              </h2>
              <p className="text-lg text-muted-foreground">
                Our modern processing plant is the heart of our operation. Equipped with advanced technology and operated by a skilled workforce, we ensure every product is handled with care to preserve its natural freshness and quality from catch to dispatch.
              </p>
              <p className="text-muted-foreground">
                We maintain rigorous hygiene and safety protocols, audited regularly to meet and exceed international standards. This focus on operational excellence is fundamental to the trust our clients place in us.
              </p>
            </div>
            <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
              {factoryImage1 && (
                <img
                  src={factoryImage1.imageUrl}
                  alt={factoryImage1.description}
                  width="400"
                  height="500"
                  className="rounded-lg shadow-lg w-full h-full object-cover"
                  data-ai-hint={factoryImage1.imageHint}
                />
              )}
              {factoryImage2 && (
                <img
                  src={factoryImage2.imageUrl}
                  alt={factoryImage2.description}
                  width="400"
                  height="500"
                  className="rounded-lg shadow-lg w-full h-full object-cover mt-8"
                  data-ai-hint={factoryImage2.imageHint}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-semibold text-primary">
              Our Seal of Quality
            </h2>
            <p className="max-w-3xl mx-auto text-muted-foreground mt-4">
              We are proud to hold internationally recognized certifications that validate our commitment to food safety, quality management, and sustainable practices.
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
            {certifications.map((cert) => (
              <div key={cert.name} className="flex items-start gap-4 p-6 border rounded-lg hover:bg-primary/5 transition-colors">
                <div className="bg-primary/10 p-3 rounded-full">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
