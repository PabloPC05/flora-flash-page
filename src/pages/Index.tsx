import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Sparkles } from 'lucide-react';
import heroImg from '@/assets/hero-vivero.jpg';
import { mockProducts } from '@/data/products';
import ProductCard from '@/components/catalog/ProductCard';
import CategorySection from '@/components/catalog/CategorySection';

const featured = mockProducts.slice(0, 4);

export default function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Vivero"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/50 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 lg:px-8 py-24 lg:py-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 px-4 py-1.5 text-sm font-medium text-primary-foreground mb-6">
              <Leaf className="h-3.5 w-3.5" />
              Tu vivero de barrio
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Tu vivero,{' '}
              <span className="italic">siempre contigo</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg leading-relaxed">
              Descubre nuestro catálogo de plantas, flores y accesorios. Encuentra todo lo que necesitas para tu jardín.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/catalogo"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg hover:opacity-90 transition-opacity"
              >
                Ver Catálogo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/el-vivero"
                className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 backdrop-blur-sm border border-primary-foreground/25 px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/25 transition-colors"
              >
                Conócenos
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full">
            <path
              d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* Categories */}
      <CategorySection />

      {/* Featured products */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary mb-2">
                <Sparkles className="h-4 w-4" />
                Selección especial
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground">
                Productos destacados
              </h2>
            </motion.div>
            <Link
              to="/catalogo"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Ver todos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="sm:hidden mt-6 text-center">
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Ver todos los productos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-primary px-8 py-12 lg:px-16 lg:py-16 text-center"
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary-foreground/5 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-primary-foreground/5 translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative">
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
                Visítanos en el vivero
              </h2>
              <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8 leading-relaxed">
                Ven a conocer nuestras plantas en persona. Te asesoramos para que encuentres la planta perfecta para tu hogar.
              </p>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 rounded-full bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary hover:opacity-90 transition-opacity"
              >
                Cómo llegar
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
