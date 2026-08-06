import { Property, RegionInfo, CorporateService } from '../types';

export const PHONE_WHATSAPP = '+56964471921';
export const PHONE_DISPLAY = '+56 9 6447 1921';
export const EMAIL_CONTACT = 'contacto@tamarpropiedades.cl';
export const EMAIL_PAOLA = 'paola@tamarpropiedades.cl';
export const EMAIL_SOFIA = 'sofia@tamarpropiedades.cl';

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'Terreno Industrial Minero Strategico',
    type: 'terreno',
    operation: 'arriendo',
    priceUF: 180,
    priceCLP: 6840000,
    location: 'Pozo Almonte, Región de Tarapacá',
    region: 'Iquique / Pozo Almonte',
    areaM2: 15000,
    landAreaM2: 15000,
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    description: 'Terreno de alto tonelaje apto para acopio de maquinaria, logística minera y proyectos fotovoltaicos. Conexión directa a Ruta 5 Norte.',
    features: ['Acceso Camiones Alto Tonelaje', 'Cierre Perimetral Reforzado', 'Energía Trifásica', 'Factibilidad H2 Verde']
  },
  {
    id: 'prop-2',
    title: 'Casa Familiar Residencial Exclusiva',
    type: 'residencial',
    operation: 'venta',
    priceUF: 8500,
    priceCLP: 323000000,
    location: 'La Serena, Región de Coquimbo',
    region: 'La Serena / Ovalle',
    bedrooms: 4,
    bathrooms: 3,
    areaM2: 220,
    landAreaM2: 450,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    description: 'Hermosa propiedad residencial con amplio jardín, quincho equipado, eficiencia energética integrada y terminaciones de alto estándar.',
    features: ['4 Dormitorios Amplios', 'Piscina & Quincho', 'Sistema Solar Térmico', 'Estacionamiento 3 Vehículos']
  },
  {
    id: 'prop-3',
    title: 'Departamento Vista Mar Ejecutivo',
    type: 'departamento',
    operation: 'arriendo',
    priceUF: 28,
    priceCLP: 1064000,
    location: 'Sector Cavancha, Iquique',
    region: 'Iquique / Pozo Almonte',
    bedrooms: 2,
    bathrooms: 2,
    areaM2: 85,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    description: 'Departamento amoblado full equipado para ejecutivos de empresas mineras y profesionales. Balcón terraza con vista panorámica al océano.',
    features: ['Vista Panorámica al Mar', 'Estacionamiento Subterráneo', 'Bodega Privada', 'Seguridad 24/7']
  },
  {
    id: 'prop-4',
    title: 'Complejo de Hospedaje Modulado para Proyectos',
    type: 'industrial',
    operation: 'arriendo',
    priceUF: 350,
    priceCLP: 13300000,
    location: 'Calama, Región de Antofagasta',
    region: 'Calama / Antofagasta',
    bedrooms: 24,
    bathrooms: 12,
    areaM2: 1200,
    landAreaM2: 3000,
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    description: 'Infraestructura modular habilitada con capacidad para 60 trabajadores de faenas. Incluye salas de estar, comedores y cocina industrial.',
    features: ['Capacidad 60+ Camas', 'Cocina & Comedor Industrial', 'Internet Satelital High-Speed', 'Servicios Complementarios']
  },
  {
    id: 'prop-5',
    title: 'Parcela Agrícola & Energía Solar',
    type: 'terreno',
    operation: 'venta',
    priceUF: 3200,
    priceCLP: 121600000,
    location: 'Valle de Limarí, Ovalle',
    region: 'La Serena / Ovalle',
    areaM2: 10000,
    landAreaM2: 10000,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    description: 'Excelente terreno plano con acciones de agua inscritas, ideal para desarrollo agrícola sostenible o instalaciones fotovoltaicas.',
    features: ['Derechos de Agua Inscritos', 'Suelo Plano Fertilidad Alta', 'Acceso Pavimentado', 'Factibilidad Solar Comprobada']
  },
  {
    id: 'prop-6',
    title: 'Bodega Logística & Oficinas Corporativas',
    type: 'industrial',
    operation: 'arriendo',
    priceUF: 120,
    priceCLP: 4560000,
    location: 'Concepción, Región del Bío Bío',
    region: 'Concepción',
    areaM2: 650,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    description: 'Centro logístico ubicado en parque industrial con excelentes accesos a puertos y rutas principales. Oficinas en segundo piso habilitadas.',
    features: ['Altura Libre 8 Metros', 'Andén de Carga y Descarga', 'Oficinas Administrativas', 'Circuito Cerrado TV']
  }
];

export const REGIONAL_COVERAGE: RegionInfo[] = [
  {
    name: 'Tarapacá (Iquique & Pozo Almonte)',
    country: 'Chile',
    hubs: ['Iquique', 'Pozo Almonte', 'Pica'],
    serviceTypes: ['Terrenos Mineros', 'Hospedaje de Faena', 'Inmuebles Catering', 'Propiedades Residenciales'],
    description: 'Base operadora clave para proyectos de litio, minería del cobre y corredores bi-oceánicos.',
    isMainBase: true
  },
  {
    name: 'Antofagasta & El Loa (Calama)',
    country: 'Chile',
    hubs: ['Calama', 'Antofagasta', 'Sierra Gorda'],
    serviceTypes: ['Patios Maquinaria', 'Campamentos Modulares', 'Logística Minera'],
    description: 'Atención directa al núcleo minero con respuesta inmediata en terreno.',
    isMainBase: true
  },
  {
    name: 'Coquimbo (La Serena & Ovalle)',
    country: 'Chile',
    hubs: ['La Serena', 'Coquimbo', 'Ovalle'],
    serviceTypes: ['Parcelas & Casas Residenciales', 'Terrenos Agro-Solares', 'Oficinas'],
    description: 'Desarrollo de proyectos residenciales, agrícolas e hídricos sostenibles.',
    isMainBase: true
  },
  {
    name: 'Valparaíso (Viña del Mar & Puerto)',
    country: 'Chile',
    hubs: ['Viña del Mar', 'Valparaíso', 'Concón'],
    serviceTypes: ['Departamentos Ejecutivos', 'Gestión Inmobiliaria', 'Consultoría'],
    description: 'Conexión puerto-ciudad con alta demanda en arrendamiento ejecutivo y primera vivienda.'
  },
  {
    name: 'Bío Bío (Concepción & Alrededores)',
    country: 'Chile',
    hubs: ['Concepción', 'Talcahuano', 'Coronel'],
    serviceTypes: ['Bodegas Logísticas', 'Soporte Industrial', 'Inversión Inmobiliaria'],
    description: 'Eje industrial y de ingeniería en la zona centro-sur del país.'
  },
  {
    name: 'Operaciones Internacionales (Bolivia & Perú)',
    country: 'Bolivia',
    hubs: ['La Paz / Santa Cruz (Bolivia)', 'Tacna / Lima (Perú)'],
    serviceTypes: ['Servicios Transfronterizos', 'Logística Bi-oceánica', 'Asesoría Inmobiliaria'],
    description: 'Alianzas estratégicas para empresas con proyectos de integración transfronteriza.'
  }
];

export const CORPORATE_SERVICES: CorporateService[] = [
  {
    id: 'serv-1',
    title: 'Hospedaje por Proyectos & Turnos',
    iconName: 'Building2',
    shortDesc: 'Soluciones integrales de habitabilidad para contratistas, ingenieros y equipos en faena.',
    fullDesc: 'Administramos y arrendamos casas, departamentos amoblados y complejos modulares preparados especialmente para acoger personal por turnos mineros o proyectos de energía e infraestructura.',
    features: ['Casas y departamentos 100% amoblados', 'Contratos corporativos flexibles', 'Servicio de aseo y mantención incluido', 'Ubicación cercana a rutas operativas'],
    idealFor: 'Empresas contratistas, consultoras y equipos de ingeniería en minería/energía.'
  },
  {
    id: 'serv-2',
    title: 'Inmuebles para Catering & Comedores',
    iconName: 'Utensils',
    shortDesc: 'Propiedades corporativas con factibilidad para la operación de casinos industriales.',
    fullDesc: 'Arriendo y habilitación de propiedades e instalaciones acondicionadas para la operación de cocinas industriales, comedores y servicios de alimentación en faena.',
    features: ['Factibilidad sanitaria', 'Espacios adaptables', 'Certificaciones al día', 'Conectividad logística'],
    idealFor: 'Empresas de alimentación, casinos e instalaciones temporales.'
  },
  {
    id: 'serv-3',
    title: 'Terrenos Mineros, Energéticos & Patios',
    iconName: 'Compass',
    shortDesc: 'Búsqueda, gestión y arriendo de paños territoriales y patios de acopio.',
    fullDesc: 'Especializados en la identificación, factibilidad legal y corretaje de terrenos de gran superficie en el norte de Chile para proyectos fotovoltaicos, mineros y patios de maquinaria.',
    features: ['Patios de acopio', 'Factibilidad eléctrica', 'Soporte en servidumbres y concesiones', 'Confidencialidad institucional'],
    idealFor: 'Desarrolladores de energía renovable, logística y mineras.'
  }
];
