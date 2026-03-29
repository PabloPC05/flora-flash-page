import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Sparkles, ScanLine, Truck, ShieldCheck, HeartHandshake } from 'lucide-react';
import heroImg from '@/assets/hero-vivero.jpg';
import { mockProducts } from '@/data/products';
import ProductCard from '@/components/catalog/ProductCard';
import CategorySection from '@/components/catalog/CategorySection';

const featured = mockProducts.slice(0, 4);

const perks = [
  { icon: Truck, title: 'Envío local gratis', desc: 'Pedidos +30 € en tu zona' },
  { icon: ShieldCheck, title: 'Plantas garantizadas', desc: '30 días de garantía verde' },
  { icon: HeartHandshake, title: 'Asesoría experta', desc: 'Te ayudamos a elegir' },
];

export default function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Vivero"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/20" />
        </div>

        <div className="relative container mx-auto px-4 lg:px-8 py-24 lg:py-36">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 px-4 py-1.5 text-sm font-medium text-primary-foreground mb-6">
              <Leaf className="h-3.5 w-3.5" />
              Tu vivero de barrio
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6">
              Tu vivero,{' '}
              <span className="italic text-secondary">siempre contigo</span>
            </h1>
            <p className="text-lg lg:text-xl text-primary-foreground/80 mb-10 max-w-lg leading-relaxed">
              Descubre nuestro catálogo de plantas, flores y accesorios. Todo lo que tu jardín necesita, a un clic.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/catalogo"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
              >
                Explorar Catálogo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/identificador"
                className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 backdrop-blur-md border border-primary-foreground/25 px-7 py-3.5 text-sm font-bold text-primary-foreground hover:bg-primary-foreground/25 transition-all duration-200"
              >
                <ScanLine className="h-4 w-4" />
                Identificar Planta
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

      {/* Trust bar */}
      <section className="py-8 border-b border-border/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {perks.map((perk, i) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 justify-center sm:justify-start"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                  <perk.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{perk.title}</p>
                  <p className="text-xs text-muted-foreground">{perk.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <CategorySection />

      {/* Featured products */}
      <section className="py-16 lg:py-24 bg-muted/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                Selección especial
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground">
                Productos destacados
              </h2>
            </motion.div>
            <Link
              to="/catalogo"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              Ver todos
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="sm:hidden mt-8 text-center">
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              Ver todos los productos
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* AI Scanner Banner */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-primary/80 px-8 py-14 lg:px-16 lg:py-20"
          >
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-primary-foreground/5 -translate-y-1/3 translate-x-1/3 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-secondary/20 translate-y-1/3 -translate-x-1/3 blur-2xl" />
            
            <div className="relative flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground mb-5">
                  <Sparkles className="h-3 w-3" />
                  Inteligencia Artificial
                </div>
                <h2 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground mb-5 leading-tight">
                  ¿No sabes qué planta tienes?
                </h2>
                <p className="text-primary-foreground/80 max-w-lg leading-relaxed mb-8 text-lg">
                  Usa nuestro identificador con IA. Sube una foto y descubre el nombre, los cuidados y mucho más.
                </p>
                <Link
                  to="/identificador"
                  className="inline-flex items-center gap-2 rounded-full bg-primary-foreground px-7 py-3.5 text-sm font-bold text-primary hover:scale-[1.02] hover:shadow-lg transition-all duration-200"
                >
                  <ScanLine className="h-4 w-4" />
                  Probar Identificador
                </Link>
              </div>
              <div className="flex h-36 w-36 lg:h-44 lg:w-44 items-center justify-center rounded-3xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 animate-float">
                <ScanLine className="h-16 w-16 lg:h-20 lg:w-20 text-primary-foreground" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Visit CTA */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
              Ven a conocernos
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-5">
              Visítanos en el vivero
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
              Te asesoramos para que encuentres la planta perfecta para tu hogar. Ven y déjate inspirar.
            </p>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground hover:scale-[1.02] hover:shadow-lg transition-all duration-200"
            >
              Cómo llegar
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
