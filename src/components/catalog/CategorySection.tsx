import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Flower2, TreePine, Apple, Layers, Container, Wrench,
} from 'lucide-react';
import type { ProductCategory } from '@/types';
import { CATEGORY_LABELS } from '@/types';

const categoryData: { key: ProductCategory; icon: React.ReactNode; image: string }[] = [
  { key: 'plantas_interior', icon: <Flower2 className="h-5 w-5" />, image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&q=80' },
  { key: 'plantas_exterior', icon: <TreePine className="h-5 w-5" />, image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80' },
  { key: 'frutales', icon: <Apple className="h-5 w-5" />, image: 'https://images.unsplash.com/photo-1598512752271-33f913a5af13?w=400&q=80' },
  { key: 'sustratos', icon: <Layers className="h-5 w-5" />, image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&q=80' },
  { key: 'macetas', icon: <Container className="h-5 w-5" />, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80' },
  { key: 'herramientas', icon: <Wrench className="h-5 w-5" />, image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80' },
];

export default function CategorySection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
            Categorías
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground">
            Explora nuestro catálogo
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoryData.map(({ key, icon, image }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Link
                to={`/catalogo?categoria=${key}`}
                className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:shadow-[var(--shadow-card)] hover:border-primary/30 hover:-translate-y-1"
              >
                {/* Background image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <img src={image} alt={CATEGORY_LABELS[key]} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-3 text-center">
                    <div className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-card/90 backdrop-blur-sm text-primary mb-1.5 mx-auto">
                      {icon}
                    </div>
                    <p className="text-sm font-semibold text-primary-foreground">
                      {CATEGORY_LABELS[key]}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
