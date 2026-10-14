import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, History, Plane, Ship, Target, ShieldCheck } from 'lucide-react';
import { certifications, companyProfile, placeholderImages } from '@/lib/placeholder-data';


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
            Discover our story, our values, and how we deliver fresh seafood by air and frozen seafood by sea to markets worldwide.
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

      {/* Shipping Options Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-primary">
              Worldwide cold-chain delivery
            </p>
            <h2 className="font-headline text-3xl font-bold text-foreground md:text-4xl">
              The right journey for every catch
            </h2>
            <p className="mt-4 text-muted-foreground">
              Choose the option that best fits your product and delivery needs.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
            <Card className="group border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
              <CardHeader className="flex-row items-center gap-4 space-y-0">
                <div className="rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Plane className="h-7 w-7" aria-hidden="true" />
                </div>
                <CardTitle className="font-headline text-2xl">Fresh Seafood by Air</CardTitle>
              </CardHeader>
              <CardContent className="pl-[5.25rem] text-muted-foreground">
                Fresh seafood is transported by air for fast delivery and careful handling on its journey to international markets.
              </CardContent>
            </Card>

            <Card className="group border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
              <CardHeader className="flex-row items-center gap-4 space-y-0">
                <div className="rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Ship className="h-7 w-7" aria-hidden="true" />
                </div>
                <CardTitle className="font-headline text-2xl">Frozen Seafood by Sea</CardTitle>
              </CardHeader>
              <CardContent className="pl-[5.25rem] text-muted-foreground">
                Frozen seafood is shipped by sea with cold-chain handling to help maintain product quality throughout transit.
              </CardContent>
            </Card>
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
