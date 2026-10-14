import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const sections = [
  {
    title: 'Information we collect',
    paragraphs: [
      'When you send a contact message or request a quotation, we collect the details you submit. These may include your name, email address, company, country, subject, products of interest, and message.',
      'If you create an account, we process your name, email address, and password. Account passwords are hashed before being stored; we do not store them as readable text.',
    ],
  },
  {
    title: 'How we use your information',
    paragraphs: [
      'We use submitted information to respond to your messages, prepare and follow up on quotation requests, and provide and administer portal accounts.',
      'Contact messages and quotation inquiries are stored in the application database. Email notifications are also sent to the company when configured, so the team can respond.',
    ],
  },
  {
    title: 'Storage, security, and service providers',
    paragraphs: [
      'When you sign in, the portal stores an authentication token and basic account details in your browser’s local storage to maintain your signed-in session. Signing out removes those stored account details. You can also clear local storage in your browser, though doing so may sign you out.',
      'We use service providers configured for the website to host application data and deliver email. They process information as needed to provide those services.',
      'We take reasonable steps to protect information handled through the website. No online transmission or storage method can be guaranteed to be completely secure.',
    ],
  },
  {
    title: 'Retention and your choices',
    paragraphs: [
      'We retain submitted information for as long as it is needed to respond to you, manage the relevant business relationship, and meet applicable operational or legal requirements. The appropriate period depends on the nature of the information and the purpose for which it was provided.',
      'You may contact us to ask about, access, correct, or request deletion of information you have submitted. We will review and respond to requests in accordance with applicable law and any obligations that require us to keep certain records.',
      'Please do not include sensitive personal information in contact messages or quotation requests.',
    ],
  },
  {
    title: 'Changes to this policy',
    paragraphs: [
      'We may update this policy when our website, practices, or applicable requirements change. The latest version will be published on this page with its updated date.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background">
      <section className="bg-primary/5 py-16 text-center md:py-20">
        <div className="container mx-auto px-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-primary">Your information</p>
          <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">Privacy Policy</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            This policy explains how Siya Suya International handles information submitted through this website.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">Last updated: 14 October 2026</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-4xl space-y-5 px-4">
          <p className="leading-relaxed text-muted-foreground">
            This policy applies to information collected through the website’s contact, quotation inquiry, and account features.
          </p>
          {sections.map((section) => (
            <Card key={section.title}>
              <CardHeader>
                <CardTitle className="font-headline text-xl">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.title === 'Changes to this policy' && (
                  <p>
                    For questions or privacy requests, please use our{' '}
                    <Link to="/contact" className="font-medium text-primary hover:underline">contact page</Link>.
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
