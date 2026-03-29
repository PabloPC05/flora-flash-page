import { Link } from 'react-router-dom';
import { Leaf, MapPin, Phone, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Leaf className="h-4 w-4" />
              </div>
              <span className="font-display text-lg font-semibold text-foreground">
                Dependiente Virtual
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tu vivero de confianza en el barrio. Plantas, flores y todo lo que necesitas para tu jardín.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-display text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Navegación
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: 'Inicio' },
                { href: '/catalogo', label: 'Catálogo' },
                { href: '/contacto', label: 'Contacto' },
                { href: '/el-vivero', label: 'El Vivero' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>Calle del Vivero, 12<br />Madrid, España</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>+34 612 345 678</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-display text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Horario
            </h3>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-primary shrink-0" />
                <span>Lun - Vie: 9:00 - 20:00</span>
              </li>
              <li className="text-sm text-muted-foreground pl-6">
                Sáb: 9:00 - 14:00
              </li>
              <li className="text-sm text-muted-foreground pl-6">
                Dom: Cerrado
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Dependiente Virtual. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
