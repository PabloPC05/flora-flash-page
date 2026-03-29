import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Flower2, TreePine, Apple, Layers, Container, Wrench,
} from 'lucide-react';
import type { ProductCategory } from '@/types';
import { CATEGORY_LABELS } from '@/types';

const categoryIcons: Record<ProductCategory, React.ReactNode> = {
  plantas_interior: <Flower2 className="h-6 w-6" />,
  plantas_exterior: <TreePine className="h-6 w-6" />,
  frutales: <Apple className="h-6 w-6" />,
  sustratos: <Layers className="h-6 w-6" />,
  macetas: <Container className="h-6 w-6" />,
  herramientas: <Wrench className="h-6 w-6" />,
};

const categories = Object.entries(CATEGORY_LABELS) as [ProductCategory, string][];

export default function CategorySection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl lg:text-4xl font-bold text-foreground text-center mb-12"
        >
          Explora nuestro catálogo
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(([key, label], i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/catalogo?categoria=${key}`}
                className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center transition-all hover:shadow-[var(--shadow-card)] hover:border-primary/30 group"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {categoryIcons[key]}
                </div>
                <span className="text-sm font-medium text-foreground">
                  {label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
