import { motion } from 'framer-motion';
import { Sun, CloudSun, Moon, PawPrint, ShoppingBag } from 'lucide-react';
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-card border border-border/60 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-product)] transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image_url}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
        
        {!product.in_stock && (
          <div className="absolute inset-0 bg-foreground/50 backdrop-blur-[2px] flex items-center justify-center">
            <span className="rounded-full bg-background px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground">
              Agotado
            </span>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="rounded-full bg-card/90 backdrop-blur-md px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {CATEGORY_LABELS[product.category]}
          </span>
        </div>

        {/* Pet safe badge */}
        {product.pet_safe && (
          <div className="absolute top-3 right-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/90 text-primary-foreground backdrop-blur-sm" title="Pet friendly">
              <PawPrint className="h-3.5 w-3.5" />
            </span>
          </div>
        )}

        {/* Quick add button */}
        {product.in_stock && (
          <div className="absolute bottom-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform">
              <ShoppingBag className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 pt-3.5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display text-base font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </div>

        <p className="text-[13px] text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
          {product.description}
        </p>

        <div className="mt-auto flex items-end justify-between">
          <div>
            <span className="text-xl font-bold text-foreground">
              {product.price.toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground ml-0.5">€</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            {product.light && (
              <span className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-[11px] font-medium">
                <LightIcon light={product.light} />
                {product.light === 'Sol Directo' ? 'Sol' : product.light === 'Luz Indirecta' ? 'Indirecta' : 'Sombra'}
              </span>
            )}
            {product.care_level && (
              <span className="rounded-md bg-muted px-2 py-1 text-[11px] font-medium">
                {product.care_level}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
