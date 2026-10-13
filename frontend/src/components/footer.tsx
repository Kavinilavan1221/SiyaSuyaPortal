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
                <span className="text-sm text-slate-400 mt-1">123 Seafood Lane, Colombo, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <Phone className="h-5 w-5 text-accent" />
                </div>
                <a href="tel:+94112345678" className="text-sm text-slate-400 hover:text-white transition-colors">
                  +94 11 234 5678
                </a>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <Mail className="h-5 w-5 text-accent" />
                </div>
                <a href="mailto:info@siyasuya.com" className="text-sm text-slate-400 hover:text-white transition-colors">
                  info@siyasuya.com
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
                <Link key={social.label} to={social.href} aria-label={social.label} className="bg-white/5 p-3 rounded-full hover:bg-accent hover:text-white text-slate-300 hover:-translate-y-1 transition-all duration-300">
                  <social.Icon className="h-5 w-5" />
                </Link>
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
             <Link to="#" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
             <Link to="#" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
