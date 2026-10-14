import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const sections = [
  {
    title: 'Using this website',
    paragraphs: [
      'You may use this website to learn about Siya Suya International, browse seafood products, contact the company, and submit quotation inquiries. You agree to use the website lawfully and not to disrupt its operation, attempt unauthorized access, or misuse its forms or services.',
    ],
  },
  {
    title: 'Product information and inquiries',
    paragraphs: [
      'Product descriptions, images, specifications, availability, and catalog information are provided for general information and may change. Please confirm product details, packaging, minimum quantities, pricing, and availability directly with the company.',
      'Submitting a contact message or quotation request does not constitute an accepted order or require either party to complete a sale. Any purchase is subject to the terms set out in a quotation, purchase order, sales agreement, or other written terms accepted by both parties.',
    ],
  },
  {
    title: 'Shipping and delivery',
    paragraphs: [
      'Frozen seafood is shipped by sea, and fresh seafood is transported by air. The products and shipping method available for a particular order, together with route, schedule, cold-chain arrangements, delivery terms, and costs, must be confirmed directly with the company.',
      'General website information is not a delivery-time guarantee. The shipping, delivery, and other terms agreed for a specific order will apply to that order.',
    ],
  },
  {
    title: 'Website content and availability',
    paragraphs: [
      'Website text, branding, design, and other content are owned by Siya Suya International or used with permission. You may not reproduce or commercially use this content without authorization, except as permitted by applicable law.',
      'We may update, change, suspend, or remove website content or features. We aim to keep the website available and information current, but do not guarantee uninterrupted access or that every page will always be error-free.',
    ],
  },
  {
    title: 'Changes and contact',
    paragraphs: [
      'We may update these terms as the website or our services change. The latest version will be published on this page with its updated date. Continued use of the website after an update means you are using the current version.',
      'These website terms do not replace any separate written agreement for a particular sale or export order. If you have questions about these terms or a potential order, please contact us.',
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-background">
      <section className="bg-primary/5 py-16 text-center md:py-20">
        <div className="container mx-auto px-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-primary">Website terms</p>
          <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">Terms &amp; Conditions</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            Please read these terms when browsing the website or submitting an inquiry.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">Last updated: 14 October 2026</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-4xl space-y-5 px-4">
          {sections.map((section) => (
            <Card key={section.title}>
              <CardHeader>
                <CardTitle className="font-headline text-xl">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.title === 'Changes and contact' && (
                  <Link to="/contact" className="inline-block font-medium text-primary hover:underline">
                    Contact Siya Suya International
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
