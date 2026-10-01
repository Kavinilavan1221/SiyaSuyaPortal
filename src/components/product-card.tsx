import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Product } from '@/lib/definitions';
import { placeholderImages } from '@/lib/placeholder-data';
import { ArrowRight } from 'lucide-react';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const image = placeholderImages.find(p => p.id === product.imageId);

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg dark:hover:shadow-primary/20">
      <CardHeader className="p-0">
        <div className="aspect-video relative">
          {image && (
            <img
              src={image.imageUrl}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
              data-ai-hint={image.imageHint}
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <CardTitle className="font-headline text-xl mb-2">{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild variant="secondary" className="w-full">
          <Link to={`/inquiry?product=${product.id}`}>
            Request Quote <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
