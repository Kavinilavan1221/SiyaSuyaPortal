'use client';

import { useState } from 'react';
import { products } from '@/lib/placeholder-data';
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/definitions';

const categories: Product['category'][] = ['Shrimp', 'Squid', 'Cuttlefish', 'Tuna', 'Crab'];
const allCategories: (Product['category'] | 'All')[] = ['All', ...categories];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<Product['category'] | 'All'>('All');

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="bg-background">
      {/* Page Header */}
      <section className="py-16 md:py-24 bg-primary/5 text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
            Our Premium Seafood Collection
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our diverse range of high-quality, sustainably sourced seafood products from the Indian Ocean.
          </p>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {allCategories.map(category => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                className={cn(
                  "rounded-full transition-all duration-300 font-semibold px-6",
                  activeCategory === category 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 scale-105' 
                    : 'border-primary/20 hover:border-primary/50 text-foreground hover:bg-primary/5'
                )}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No products found for this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
