export type PropertyType = 'residencial' | 'industrial' | 'departamento' | 'terreno';
export type OperationType = 'venta' | 'arriendo';

export interface Property {
  id: string;
  title: string;
  type: PropertyType | string;
  category?: string;
  operation: OperationType | string;
  priceUF: number;
  priceCLP: number;
  location: string;
  region: string;
  bedrooms?: number;
  bathrooms?: number;
  areaM2: number;
  landAreaM2?: number;
  image: string;
  gallery?: string[];
  videoUrl?: string;
  featured: boolean;
  description: string;
  features: string[];
  status?: string;
}

export interface RegionInfo {
  name: string;
  country: 'Chile' | 'Bolivia' | 'Perú';
  hubs: string[];
  serviceTypes: string[];
  description: string;
  isMainBase?: boolean;
}

export interface CorporateService {
  id: string;
  title: string;
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  idealFor: string;
}

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  location: string;
  message: string;
}
