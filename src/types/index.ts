export type CareLevel = 'Bajo' | 'Medio' | 'Alto';
export type LightRequirement = 'Sombra' | 'Luz Indirecta' | 'Sol Directo';

export type ProductCategory =
  | 'plantas_interior'
  | 'plantas_exterior'
  | 'frutales'
  | 'sustratos'
  | 'macetas'
  | 'herramientas';

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  plantas_interior: 'Plantas de Interior',
  plantas_exterior: 'Plantas de Exterior',
  frutales: 'Frutales',
  sustratos: 'Sustratos',
  macetas: 'Macetas',
  herramientas: 'Herramientas',
};

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  category: ProductCategory;
  care_level: CareLevel | null;
  light: LightRequirement | null;
  pet_safe: boolean;
  in_stock: boolean;
}
