import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter } from 'lucide-react';
import Logo from './logo';

const navLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/products', label: 'Products' },
  { href: '/inquiry', label: 'Inquiry' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  { Icon: Facebook, href: '#', label: 'Facebook' },
  { Icon: Linkedin, href: '#', label: 'LinkedIn' },
  { Icon: Twitter, href: '#', label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Logo className="text-primary-foreground" />
            <p className="text-sm text-primary-foreground/80">
              Your trusted partner for premium, sustainably sourced seafood from the pristine waters of Sri Lanka.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-headline text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-headline text-lg font-semibold">Contact Us</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-1 shrink-0" />
                <span className="text-sm text-primary-foreground/80">123 Seafood Lane, Colombo, Sri Lanka</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 shrink-0" />
                <a href="tel:+94112345678" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  +94 11 234 5678
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 shrink-0" />
                <a href="mailto:info@siyasuya.com" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  info@siyasuya.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-headline text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map(social => (
                <Link key={social.label} to={social.href} aria-label={social.label} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  <social.Icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary/80">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-primary-foreground/70">
          © {new Date().getFullYear()} Siya Suya International. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
