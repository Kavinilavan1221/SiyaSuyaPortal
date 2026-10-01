import { Fish } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2 text-black dark:text-white", className)}>
      <Fish className="h-6 w-6" />
      <span className="font-headline text-xl font-bold tracking-wide">
        Siya Suya International
      </span>
    </Link>
  );
}
