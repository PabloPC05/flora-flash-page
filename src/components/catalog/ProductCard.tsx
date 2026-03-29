import { motion } from 'framer-motion';
import { Sun, CloudSun, Moon, PawPrint } from 'lucide-react';
import type { Product } from '@/types';
import { CATEGORY_LABELS } from '@/types';

interface ProductCardProps {
  product: Product;
}

function LightIcon({ light }: { light: Product['light'] }) {
  if (light === 'Sol Directo') return <Sun className="h-3.5 w-3.5" />;
  if (light === 'Luz Indirecta') return <CloudSun className="h-3.5 w-3.5" />;
  if (light === 'Sombra') return <Moon className="h-3.5 w-3.5" />;
  return null;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)] transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {!product.in_stock && (
          <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
            <span className="rounded-full bg-background px-3 py-1 text-xs font-semibold text-foreground">
              Agotado
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="rounded-full bg-background/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-muted-foreground">
            {CATEGORY_LABELS[product.category]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-foreground mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            {product.price.toFixed(2)} €
          </span>
          <div className="flex items-center gap-2 text-muted-foreground">
            {product.light && (
              <span className="flex items-center gap-1 text-xs">
                <LightIcon light={product.light} />
              </span>
            )}
            {product.care_level && (
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                {product.care_level}
              </span>
            )}
            {product.pet_safe && (
              <PawPrint className="h-3.5 w-3.5 text-primary" />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
