'use client';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, UserCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const navLinks = [
  { href: '/home', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/our-team', label: 'Our Team' },
  { href: '/products', label: 'Products' },
  { href: '/contact', label: 'Contact' },
];

export default function MainNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    let name = localStorage.getItem('userName');
    const role = localStorage.getItem('userRole');
    if (name === 'Super Admin' || name === 'Super' || (role === 'admin' && name && name.toLowerCase().includes('super'))) {
      name = 'Admin';
      localStorage.setItem('userName', 'Admin');
    }
    if (name) setUserName(name);
    if (role) setUserRole(role);
  }, [location.pathname]);

  const getDisplayName = (name: string | null) => {
    if (!name) return '';
    if (name === 'Super' || name === 'Super Admin' || (userRole === 'admin' && name.toLowerCase().includes('super'))) {
      return 'Admin';
    }
    return name.split(' ')[0];
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    setUserName(null);
    setUserRole(null);
    navigate('/login');
  };

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      to={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        pathname === href ? 'text-primary' : 'text-muted-foreground'
      )}
      onClick={() => setIsMenuOpen(false)}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          {navLinks.map(link => (
            <NavLink key={link.href} {...link} />
          ))}
          
          {userName ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-semibold text-primary">
                  <UserCircle className="mr-2 h-5 w-5" /> Hi, {getDisplayName(userName)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {userRole === 'admin' && (
                  <DropdownMenuItem onClick={() => navigate('/admin/dashboard')}>
                    Admin Dashboard
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <NavLink href="/login" label="Login" />
          )}

          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link to="/inquiry">Request a Quote</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="container mx-auto flex flex-col items-start space-y-4 px-4 pb-4">
            {navLinks.map(link => (
              <NavLink key={link.href} {...link} />
            ))}
            
            {userName ? (
              <div className="flex flex-col w-full space-y-2 pt-2 border-t">
                <span className="text-sm font-semibold text-primary px-2">Hi, {getDisplayName(userName)}</span>
                {userRole === 'admin' && (
                  <Button variant="ghost" className="w-full justify-start" onClick={() => { setIsMenuOpen(false); navigate('/admin/dashboard'); }}>
                    Admin Dashboard
                  </Button>
                )}
                <Button variant="ghost" className="w-full justify-start text-destructive" onClick={() => { setIsMenuOpen(false); handleLogout(); }}>
                  Logout
                </Button>
              </div>
            ) : (
              <NavLink href="/login" label="Login" />
            )}

            <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/inquiry" onClick={() => setIsMenuOpen(false)}>Request a Quote</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
