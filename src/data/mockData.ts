import { Property, ClientBrand, RegionInfo, CorporateService } from '../types';

export const PHONE_WHATSAPP = '+56974747910';
export const PHONE_DISPLAY = '+56 9 7474 7910';
export const EMAIL_CONTACT = 'contacto@tamarpropiedades.cl';

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
    features: ['Capacidad 60+ Camas', 'Cocina & Comedor Industrial', 'Internet Satelital High-Speed', 'Servicio Catering Opcional']
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

export const CLIENT_BRANDS: ClientBrand[] = [
  {
    id: 'c-1',
    name: 'Elecnor Chile',
    category: 'Infraestructura & Energía',
    projectScope: 'Arriendo de terrenos logísticos y soporte habitacional en norte de Chile.',
    region: 'Tarapacá y Antofagasta',
    logoText: 'ELECNOR'
  },
  {
    id: 'c-2',
    name: 'Grupo TELCOH Solar',
    category: 'Energía Renovable',
    projectScope: 'Gestión de paños territoriales para parques fotovoltaicos.',
    region: 'Coquimbo y Atacama',
    logoText: 'TELCOH SOLAR'
  },
  {
    id: 'c-3',
    name: 'Aramark',
    category: 'Servicios de Alimentación & Facility',
    projectScope: 'Soporte de infraestructura y módulos de alojamiento en faenas.',
    region: 'Nacional',
    logoText: 'ARAMARK'
  },
  {
    id: 'c-4',
    name: 'Piloansa',
    category: 'Ingeniería & Pilotaje',
    projectScope: 'Catering industrial y arriendo de maquinaria pesada.',
    region: 'Calama & Pozo Almonte',
    logoText: 'PILOANSA'
  },
  {
    id: 'c-5',
    name: 'Climatización Beriestain',
    category: 'HVAC & Ingeniería Industrial',
    projectScope: 'Hospedaje técnico continuo y oficinas en terreno.',
    region: 'Viña del Mar & Concepción',
    logoText: 'BERIESTAIN HVAC'
  },
  {
    id: 'c-6',
    name: 'Cainsa SyM',
    category: 'Montaje & Servicios Mineros',
    projectScope: 'Arriendo de terrenos mineros y logística de turnos.',
    region: 'Iquique & Antofagasta',
    logoText: 'CAINSA SyM'
  },
  {
    id: 'c-7',
    name: 'GESCO',
    category: 'Gestión de Proyectos & Servicios',
    projectScope: 'Consultoría territorial y alojamientos corporativos.',
    region: 'Norte y Centro',
    logoText: 'GESCO'
  },
  {
    id: 'c-8',
    name: 'H&H Señalética',
    category: 'Vialidad & Seguridad Industrial',
    projectScope: 'Soporte logístico y bodegaje en puntos clave.',
    region: 'Coquimbo & Valparaíso',
    logoText: 'H&H SEÑALÉTICA'
  },
  {
    id: 'c-9',
    name: 'DHVCHILE',
    category: 'Consultoría & Soluciones Ambientales',
    projectScope: 'Ingeniería ambiental y análisis de suelos para loteos.',
    region: 'Nacional e Internacional',
    logoText: 'DHVCHILE'
  }
];

export const REGIONAL_COVERAGE: RegionInfo[] = [
  {
    name: 'Tarapacá (Iquique & Pozo Almonte)',
    country: 'Chile',
    hubs: ['Iquique', 'Pozo Almonte', 'Pica'],
    serviceTypes: ['Terrenos Mineros', 'Hospedaje de Faena', 'Catering Industrial', 'Propiedades Residenciales'],
    description: 'Base operadora clave para proyectos de litio, minería del cobre y corredores bi-oceánicos.',
    isMainBase: true
  },
  {
    name: 'Antofagasta & El Loa (Calama)',
    country: 'Chile',
    hubs: ['Calama', 'Antofagasta', 'Sierra Gorda'],
    serviceTypes: ['Arriendo de Maquinaria', 'Campamentos Modulares', 'Logística Minera'],
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
    title: 'Catering Industrial & Alimentación',
    iconName: 'Utensils',
    shortDesc: 'Alimentación nutritiva y certificada para trabajadores en proyectos de campo.',
    fullDesc: 'Provisión de servicios gastronómicos para faenas e instalaciones temporales. Cumplimos con elevados estándares de inocuidad y balance nutricional adaptado a exigencias de alta montaña y clima desértico.',
    features: ['Desayunos, almuerzos y cenas nutritivas', 'Kits colación para terreno', 'Certificaciones de inocuidad al día', 'Logística térmica asegurada'],
    idealFor: 'Empresas con personal en faenas mineras, fotovoltaicas o montajes.'
  },
  {
    id: 'serv-3',
    title: 'Arriendo de Maquinaria & Equipos',
    iconName: 'Truck',
    shortDesc: 'Flota operativa de maquinaria pesada, vehículos y equipos de soporte industrial.',
    fullDesc: 'Proveemos maquinaria pesada, generadores, camiones tolva y equipos de movimiento de tierra con mantenimiento continuo y soporte técnico en sitio.',
    features: ['Maquinaria pesada y movimiento de tierra', 'Generadores trifásicos de alta potencia', 'Operadores certificados opcionales', 'Respuesta técnica 24/7'],
    idealFor: 'Proyectos de construcción, caminos, movimientos de tierra y montaje.'
  },
  {
    id: 'serv-4',
    title: 'Terrenos Mineros & Energéticos',
    iconName: 'Compass',
    shortDesc: 'Búsqueda, gestión y arriendo de paños territoriales para energía y minería.',
    fullDesc: 'Especializados en la identificación, factibilidad legal y corretaje de terrenos de gran superficie en el norte de Chile para proyectos fotovoltaicos, eólicos e industriales.',
    features: ['Estudio de factibilidad de suelo', 'Derechos de agua y factibilidad eléctrica', 'Soporte en servidumbres y concesiones', 'Confidencialidad institucional'],
    idealFor: 'Desarrolladores de energía renovable, mineras e industrias químicas.'
  }
];
