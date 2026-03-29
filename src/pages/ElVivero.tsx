import { motion } from 'framer-motion';
import { Leaf, Heart, Users, Award } from 'lucide-react';

const values = [
  {
    icon: <Leaf className="h-6 w-6" />,
    title: 'Sostenibilidad',
    desc: 'Cultivamos con prácticas respetuosas con el medio ambiente.',
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Pasión',
    desc: 'Amamos las plantas y queremos transmitirlo a cada cliente.',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Comunidad',
    desc: 'Somos parte del barrio y nos gusta cuidar de nuestros vecinos.',
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: 'Calidad',
    desc: 'Seleccionamos las mejores plantas y productos para ti.',
  },
];

export default function ElVivero() {
  return (
    <div className="py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
            El Vivero
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Somos un pequeño vivero de barrio con más de 15 años de experiencia cuidando plantas
            y asesorando a nuestros clientes. Nuestra misión es acercar la naturaleza a cada hogar.
          </p>
        </motion.div>

        {/* Values */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center rounded-2xl border border-border bg-card p-6"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground mb-4">
                {v.icon}
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Image gallery */}
        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {[
            'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
            'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=80',
            'https://images.unsplash.com/photo-1491147334573-44cbb4602074?w=600&q=80',
          ].map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="aspect-[4/3] overflow-hidden rounded-2xl"
            >
              <img
                src={src}
                alt="Vivero"
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
