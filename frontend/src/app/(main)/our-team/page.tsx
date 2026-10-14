import { Mail, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const teamMembers = [
  {
    name: 'Mr. Velayuthapillai Srikanthan',
    role: 'Director',
    languages: ['Tamil', 'Sinhala'],
    phone: '0773650058',
    email: 'siyasuyainternationalpvt@gmail.com',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&h=900&q=85',
  },
  {
    name: 'Miss. Annesiyani',
    role: 'Business Development Executive',
    languages: ['English', 'Tamil', 'Sinhala'],
    phone: '0772192742',
    email: 'siyasuyainfo@gmail.com',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&h=900&q=85',
  },
  {
    name: 'Mrs. Subashini Srikanthan',
    role: 'Assistant Director',
    languages: ['Tamil'],
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&h=900&q=85',
  },
  {
    name: 'Miss. Suthakaran Thanushiya',
    role: 'Finance Executive',
    languages: ['English', 'Tamil'],
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&h=900&q=85',
  },
];

export default function OurTeamPage() {
  return (
    <div className="bg-background">
      <section className="bg-primary/5 py-16 text-center md:py-24">
        <div className="container mx-auto px-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-primary">The people behind Siya Suya</p>
          <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">Meet Our Team</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Meet the people working together to bring quality Sri Lankan seafood to customers around the world.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <p className="mx-auto mb-8 max-w-3xl text-center text-sm text-muted-foreground">
            The portraits below are temporary illustrative photos and do not represent the team members. We’ll replace them with their photos when available.
          </p>
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <Card key={member.name} className="group overflow-hidden border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[4/4.5] overflow-hidden bg-muted">
                  <img
                    src={member.image}
                    alt={`Temporary illustrative portrait for ${member.name}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
                    Sample photo
                  </span>
                </div>
                <CardContent className="space-y-4 p-5">
                  <div>
                    <h2 className="font-headline text-xl font-bold leading-tight text-foreground">{member.name}</h2>
                    <p className="mt-2 text-sm font-semibold text-primary">{member.role}</p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Languages</p>
                    <div className="flex flex-wrap gap-2">
                      {member.languages.map((language) => (
                        <span key={language} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>

                  {(member.phone || member.email) && (
                    <div className="space-y-2 border-t border-border/70 pt-4 text-sm">
                      {member.phone && (
                        <a href={`tel:${member.phone}`} className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary">
                          <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                          <span>{member.phone}</span>
                        </a>
                      )}
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="flex items-start gap-2 break-all text-muted-foreground transition-colors hover:text-primary">
                          <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                          <span>{member.email}</span>
                        </a>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
