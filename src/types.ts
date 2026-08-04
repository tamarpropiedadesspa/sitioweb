export type PropertyType = 'residencial' | 'industrial' | 'departamento' | 'terreno';
export type OperationType = 'venta' | 'arriendo';

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  operation: OperationType;
  priceUF: number;
  priceCLP: number;
  location: string;
  region: string;
  bedrooms?: number;
  bathrooms?: number;
  areaM2: number;
  landAreaM2?: number;
  image: string;
  featured: boolean;
  description: string;
  features: string[];
}

export interface ClientBrand {
  id: string;
  name: string;
  category: string;
  projectScope: string;
  region: string;
  logoText: string;
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
