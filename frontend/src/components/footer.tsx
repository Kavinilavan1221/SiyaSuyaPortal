import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Linkedin } from 'lucide-react';
import Logo from './logo';

function WhatsAppIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

const navLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/our-team', label: 'Our Team' },
  { href: '/products', label: 'Products' },
  { href: '/inquiry', label: 'Inquiry' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  { Icon: Facebook, href: '#', label: 'Facebook' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/siya-suya-ab7016444', label: 'LinkedIn' },
  { Icon: WhatsAppIcon, href: '#', label: 'WhatsApp' },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#0a192f] to-[#06101e] text-white border-t border-white/10 overflow-hidden">
      {/* Subtle ambient light in the background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent blur-sm" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <Logo className="text-white scale-110 origin-left" />
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Your trusted partner for premium, sustainably sourced seafood from the pristine waters of Sri Lanka, delivered globally.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-headline text-xl font-semibold mb-6 text-slate-100">Quick Links</h3>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-slate-400 hover:text-accent transition-all duration-300 flex items-center group">
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 ease-out text-accent mr-0 group-hover:mr-2">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-headline text-xl font-semibold mb-6 text-slate-100">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 group">
                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <span className="text-sm text-slate-400 mt-1">
                  Siya Suya International Seafood Export, Prison Road, Dalupotha, Negombo, Sri Lanka
                </span>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <Phone className="h-5 w-5 text-accent" />
                </div>
                <div className="flex flex-col gap-1 text-sm text-slate-400">
                  <a href="tel:+94772192742" className="hover:text-white transition-colors">
                    +94 77 219 2742 <span className="ml-1 text-xs opacity-80">(English)</span>
                  </a>
                  <a href="tel:+94773650058" className="hover:text-white transition-colors">
                    +94 77 365 0058 <span className="ml-1 text-xs opacity-80">(Tamil)</span>
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <Mail className="h-5 w-5 text-accent" />
                </div>
                <a href="mailto:siyasuyainternationalpvt@gmail.com" className="text-sm text-slate-400 hover:text-white transition-colors break-all">
                  siyasuyainternationalpvt@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-headline text-xl font-semibold mb-6 text-slate-100">Follow Us</h3>
            <p className="text-sm text-slate-400 mb-4">Stay updated with our latest catches and export news.</p>
            <div className="flex space-x-3">
              {socialLinks.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={social.label}
                  className="bg-white/5 p-3 rounded-full hover:bg-accent hover:text-white text-slate-300 hover:-translate-y-1 transition-all duration-300"
                >
                  <social.Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="container mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <div>© {new Date().getFullYear()} Siya Suya International. All Rights Reserved.</div>
          <div className="flex space-x-4 mt-4 md:mt-0">
             <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
             <Link to="/terms-and-conditions" className="hover:text-slate-300 transition-colors">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
