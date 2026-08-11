import { Property, RegionInfo, CorporateService } from '../types';

export const PHONE_WHATSAPP = '+56964471921';
export const PHONE_DISPLAY = '+56 9 6447 1921';
export const EMAIL_CONTACT = 'contacto@tamarpropiedades.cl';

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'Terreno Industrial & Patio de Acopio',
    type: 'terreno',
    operation: 'arriendo',
    priceUF: 180,
    priceCLP: 6840000,
    location: 'Antofagasta, Región de Antofagasta',
    region: 'Antofagasta',
    areaM2: 15000,
    landAreaM2: 15000,
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    description: 'Terreno apto para acopio de maquinaria pesada, logística y proyectos industriales en Antofagasta.',
    features: ['Acceso Camiones Alto Tonelaje', 'Cierre Perimetral Reforzado', 'Energía Trifásica']
  },
  {
    id: 'prop-2',
    title: 'Casa Amoblada para Empresa',
    type: 'residencial',
    operation: 'arriendo',
    priceUF: 40,
    priceCLP: 1633792,
    location: 'Ovalle, Región de Coquimbo',
    region: 'Ovalle',
    bedrooms: 4,
    bathrooms: 2,
    areaM2: 220,
    landAreaM2: 450,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    description: 'Amplia casa amoblada para empresa. Camas single, living y comedor amplio, estacionamiento techado.',
    features: ['4 Dormitorios Amplios', 'Full Amoblada', 'Estacionamiento Techado', 'Portón Eléctrico']
  },
  {
    id: 'prop-3',
    title: 'Casa Corporativa para Personal',
    type: 'residencial',
    operation: 'arriendo',
    priceUF: 50,
    priceCLP: 2042240,
    location: 'Calama, Región de Antofagasta',
    region: 'Calama',
    bedrooms: 5,
    bathrooms: 4,
    areaM2: 250,
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    description: 'Casa amoblada en Calama para personal de empresa. Excelente ubicación y conectividad.',
    features: ['5 Dormitorios', '4 Baños', 'Apta para Turnos', 'Seguridad']
  }
];

export const REGIONAL_COVERAGE: RegionInfo[] = [
  {
    name: 'Región de Antofagasta (Calama & Antofagasta)',
    country: 'Chile',
    hubs: ['Calama', 'Antofagasta', 'Sierra Gorda'],
    serviceTypes: ['Hospedaje para Empresas', 'Terrenos & Patios de Acopio', 'Servicio de Catering'],
    description: 'Atención directa para empresas e infraestructura en el núcleo minero del norte.',
    isMainBase: true
  },
  {
    name: 'Región de Coquimbo (La Serena & Ovalle)',
    country: 'Chile',
    hubs: ['Ovalle', 'La Serena', 'Coquimbo'],
    serviceTypes: ['Casas Residenciales', 'Casas para Empresas', 'Terrenos'],
    description: 'Soluciones de habitabilidad y corretaje de propiedades residenciales e industriales.',
    isMainBase: true
  }
];

export const CORPORATE_SERVICES: CorporateService[] = [
  {
    id: 'serv-1',
    title: 'Hospedaje para Proyectos & Turnos',
    iconName: 'Building2',
    shortDesc: 'Arriendo de casas y complejos habitacionales amoblados y acondicionados para el alojamiento de personal de empresas.',
    fullDesc: 'Inmuebles residenciales estratégicamente ubicados con capacidad e instalaciones listas para ingenieros y equipos de trabajo.',
    features: ['Casas y departamentos 100% amoblados', 'Contratos corporativos flexibles', 'Ubicación cercana a rutas operativas'],
    idealFor: 'Empresas contratistas, consultoras e ingenierías.'
  },
  {
    id: 'serv-2',
    title: 'Servicio de Catering & Alimentación',
    iconName: 'Utensils',
    shortDesc: 'Provisión integral de servicios de alimentación y catering para personal de empresas en terreno.',
    fullDesc: 'Servicios gastronómicos nutritivos y certificados adaptados a turnos y faenas operativas con altos estándares de calidad.',
    features: ['Menús nutritivos y balanceados', 'Colaciones para terreno', 'Certificación sanitaria al día'],
    idealFor: 'Empresas con personal en proyectos y turnos.'
  },
  {
    id: 'serv-3',
    title: 'Terrenos & Patios de Acopio',
    iconName: 'Compass',
    shortDesc: 'Búsqueda, corretaje y arriendo de paños de tierra y patios de acopio para maquinaria en Antofagasta y Ovalle.',
    fullDesc: 'Terrenos con accesibilidad y cierre perimetral para almacenamiento de flota pesada, acopio e instalaciones operativas.',
    features: ['Patios cerrados para maquinaria pesada', 'Ubicaciones estratégicas en Antofagasta y Ovalle', 'Gestión confidencial e institucional'],
    idealFor: 'Empresas de montaje, transporte y proyectos industriales.'
  }
];
