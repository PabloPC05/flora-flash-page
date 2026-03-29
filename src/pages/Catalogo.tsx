import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { mockProducts } from '@/data/products';
import { CATEGORY_LABELS, type ProductCategory } from '@/types';
import ProductCard from '@/components/catalog/ProductCard';

const allCategories = Object.entries(CATEGORY_LABELS) as [ProductCategory, string][];

export default function Catalogo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('categoria') as ProductCategory | null;
  const [activeCategory, setActiveCategory] = useState<ProductCategory | null>(initialCategory);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return mockProducts.filter((p) => {
      if (activeCategory && p.category !== activeCategory) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [activeCategory, search]);

  const handleCategory = (cat: ProductCategory | null) => {
    setActiveCategory(cat);
    if (cat) {
      setSearchParams({ categoria: cat });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Nuestro Catálogo
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Explora nuestra selección de plantas, macetas, sustratos y herramientas para tu jardín.
          </p>
        </motion.div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-border bg-card pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => handleCategory(null)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              !activeCategory
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            Todos
          </button>
          {allCategories.map(([key, label]) => (
            <button
              key={key}
              onClick={() => handleCategory(key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Products */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No se encontraron productos.</p>
          </div>
        )}
      </div>
    </div>
  );
}
