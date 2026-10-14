import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link to="/home" className={cn("flex items-center gap-2 text-black dark:text-white", className)}>
      <img
        src="/logo.jpeg"
        alt="Siya Suya International logo"
        width={48}
        height={48}
        className="h-10 w-10 shrink-0 rounded-full object-cover"
      />
      <span className="font-headline text-xl font-bold tracking-wide">
        Siya Suya International
      </span>
    </Link>
  );
}
