import React, { useState, useEffect, useMemo } from 'react';
import { Property, PropertyType } from '../types';
import { MOCK_PROPERTIES, PHONE_WHATSAPP } from '../data/mockData';
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  Phone,
  Search,
  X,
  Check,
  Eye,
  RefreshCw,
  Film,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Loader2,
  Filter,
} from 'lucide-react';

interface PropertyCatalogProps {
  initialTypeFilter?: string;
  initialCityFilter?: string;
}

const GOOGLE_SHEETS_API_URL =
  'https://script.google.com/macros/s/AKfycbwmI_sUsJzoDxpIcGkaP5EOwlX0sZ3SNEYs4MMDMJ8soRODfPIh6LyYr0VuMTKB-RvY/exec';

export const PropertyCatalog: React.FC<PropertyCatalogProps> = ({
  initialTypeFilter = 'todas',
  initialCityFilter = 'todas',
}) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Filters
  const [selectedType, setSelectedType] = useState<string>(initialTypeFilter);
  const [selectedOperation, setSelectedOperation] = useState<string>('todas');
  const [selectedCity, setSelectedCity] = useState<string>(initialCityFilter);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal / Lightbox State
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  // Fetch real-time data from Google Sheets API
  const fetchCatalogData = async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setApiError(null);

    try {
      const response = await fetch(GOOGLE_SHEETS_API_URL, {
        method: 'GET',
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('La URL del WebApp de Google Script no fue encontrada (404). Verifica que esté desplegada como Aplicación Web pública.');
        }
        throw new Error(`Error en respuesta del servidor (${response.status})`);
      }

      const result = await response.json();

      let rawItems: any[] = [];
      if (Array.isArray(result)) {
        rawItems = result;
      } else if (result && Array.isArray(result.data)) {
        rawItems = result.data;
      } else if (result && Array.isArray(result.properties)) {
        rawItems = result.properties;
      } else if (result && Array.isArray(result.items)) {
        rawItems = result.items;
      }

      // Filter only properties with state = 'Activo' (if estado column is present)
      const activeItems = rawItems.filter((item) => {
        if (!item) return false;
        if (!item.estado && !item.state && !item.status) return true; // If no status column, include
        const estadoStr = String(item.estado || item.state || item.status || '').trim().toLowerCase();
        return estadoStr === 'activo' || estadoStr === 'active' || estadoStr === 'publicado' || estadoStr === 'true';
      });

      // Map raw sheet items to normalized Property interface
      const mapped: Property[] = activeItems.map((item, index) => {
        const gallery: string[] = [];

        // Check main photo
        const mainPhoto = item.foto_principal || item.foto1 || item.foto_1 || item.imagen || item.image;
        if (mainPhoto && typeof mainPhoto === 'string' && mainPhoto.trim()) {
          gallery.push(mainPhoto.trim());
        }

        // Check foto_1 to foto_10
        for (let i = 1; i <= 10; i++) {
          const photoKey = item[`foto_${i}`] || item[`foto${i}`];
          if (photoKey && typeof photoKey === 'string' && photoKey.trim()) {
            if (!gallery.includes(photoKey.trim())) {
              gallery.push(photoKey.trim());
            }
          }
        }

        // Check galeria_fotos field
        if (item.galeria_fotos) {
          if (Array.isArray(item.galeria_fotos)) {
            item.galeria_fotos.forEach((url: any) => {
              if (typeof url === 'string' && url.trim() && !gallery.includes(url.trim())) {
                gallery.push(url.trim());
              }
            });
          } else if (typeof item.galeria_fotos === 'string') {
            item.galeria_fotos.split(',').forEach((url: string) => {
              if (url.trim() && !gallery.includes(url.trim())) {
                gallery.push(url.trim());
              }
            });
          }
        }

        const defaultImg =
          'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1000&q=80';
        const image = gallery[0] || defaultImg;

        // Parse features
        const features: string[] = [];
        if (Array.isArray(item.caracteristicas)) {
          item.caracteristicas.forEach((f: any) => typeof f === 'string' && features.push(f));
        } else if (typeof item.caracteristicas === 'string' && item.caracteristicas.trim()) {
          item.caracteristicas.split(',').forEach((f: string) => features.push(f.trim()));
        }

        const priceUF = parseFloat(item.precio_uf || item.precioUF || item.priceUF || 0);
        const priceCLP = parseFloat(item.precio_clp || item.precioCLP || item.priceCLP || 0);

        return {
          id: String(item.id || item.ID || item.id_propiedad || index + 1),
          title: item.titulo || item.title || 'Propiedad Tamar',
          type: String(item.tipo || item.type || 'residencial').toLowerCase(),
          category: item.categoria || item.category || (item.tipo === 'industrial' ? 'Corporativo' : 'Residencial'),
          operation: String(item.operacion || item.operation || 'venta').toLowerCase(),
          priceUF: isNaN(priceUF) ? 0 : priceUF,
          priceCLP: isNaN(priceCLP) ? 0 : priceCLP,
          location: item.ubicacion || item.location || item.ciudad || 'Chile',
          region: item.region || item.zona || item.ubicacion || 'Nacional',
          bedrooms: item.habitaciones ? parseInt(item.habitaciones, 10) : (item.dormitorios ? parseInt(item.dormitorios, 10) : undefined),
          bathrooms: item.banos ? parseInt(item.banos, 10) : undefined,
          areaM2: item.superficie_m2 ? parseFloat(item.superficie_m2) : (item.superficie ? parseFloat(item.superficie) : 0),
          image,
          gallery: gallery.length > 0 ? gallery : [image],
          videoUrl: item.video_url || item.video || undefined,
          featured: Boolean(item.destacado || item.featured),
          description: item.descripcion || item.description || 'Sin descripción disponible.',
          features: features.length > 0 ? features : ['Inspección previa en terreno', 'Asesoría legal incluida'],
          status: item.estado || 'Activo',
        };
      });

      setProperties(mapped.slice(0, 15));
    } catch (err: any) {
      console.error('Error fetching Google Sheets API:', err);
      setApiError('No se pudo establecer conexión en vivo con la base de datos de propiedades.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCatalogData();
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // Type match
      if (selectedType !== 'todas' && prop.type !== selectedType) {
        return false;
      }
      // Operation match
      if (selectedOperation !== 'todas' && prop.operation !== selectedOperation) {
        return false;
      }
      // City match
      if (selectedCity !== 'todas' && !prop.region.toLowerCase().includes(selectedCity.toLowerCase()) && !prop.location.toLowerCase().includes(selectedCity.toLowerCase())) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(query);
        const matchesLocation = prop.location.toLowerCase().includes(query);
        const matchesDesc = prop.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLocation && !matchesDesc) return false;
      }
      return true;
    });
  }, [properties, selectedType, selectedOperation, selectedCity, searchQuery]);

  const generateWhatsAppLink = (property: Property) => {
    const text = `Hola Tamar Propiedades, quiero cotizar la propiedad ID #${property.id}: ${property.title}`;
    return `https://wa.me/${PHONE_WHATSAPP.replace('+', '')}?text=${encodeURIComponent(text)}`;
  };

  const openPropertyModal = (property: Property) => {
    setActiveProperty(property);
    setActivePhotoIndex(0);
  };

  // Helper to format YouTube embed URLs
  const getEmbedVideoUrl = (url?: string) => {
    if (!url) return null;
    if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
      let videoId = '';
      if (url.includes('v=')) {
        videoId = url.split('v=')[1]?.split('&')[0];
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0];
      }
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=0`;
      }
    }
    return url;
  };

  return (
    <section id="propiedades" className="py-20 bg-white text-slate-800 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E36] font-sans">
              Propiedades & Paños Destacados
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl">
              Explora nuestra cartera actualizada en tiempo real con ficha técnica completa y contacto directo por WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchCatalogData(true)}
              disabled={isRefreshing || isLoading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0B1E36] font-bold text-xs border border-slate-300 shadow-sm transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 text-[#C87A32] ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Sincronizando...' : 'Recargar catálogo'}</span>
            </button>
          </div>
        </div>

        {/* API Error Notification Banner */}
        {apiError && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold shadow-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>{apiError}</span>
            </div>
            <button
              onClick={() => fetchCatalogData(true)}
              className="shrink-0 px-3 py-1.5 bg-[#C87A32] text-white rounded-lg font-bold hover:bg-[#A85D23] transition-colors"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl mb-10 space-y-4 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Buscar por ciudad, tipo o palabras..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-300 text-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-[#C87A32]"
              />
            </div>

            {/* Property Type Filter */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-white border border-slate-300 text-slate-800 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#C87A32]"
              >
                <option value="todas">Tipo: Todos</option>
                <option value="residencial">Casas Residenciales</option>
                <option value="departamento">Departamentos</option>
                <option value="terreno">Terrenos / Parcelas</option>
                <option value="industrial">Industrial / Faenas</option>
              </select>
            </div>

            {/* Operation Type Filter */}
            <div>
              <select
                value={selectedOperation}
                onChange={(e) => setSelectedOperation(e.target.value)}
                className="w-full bg-white border border-slate-300 text-slate-800 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#C87A32]"
              >
                <option value="todas">Operación: Todas</option>
                <option value="venta">En Venta</option>
                <option value="arriendo">En Arriendo</option>
              </select>
            </div>

            {/* Region Filter */}
            <div>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-white border border-slate-300 text-slate-800 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#C87A32]"
              >
                <option value="todas">Zona: Todo Chile</option>
                <option value="Iquique">Iquique / Pozo Almonte</option>
                <option value="Calama">Calama / Antofagasta</option>
                <option value="La Serena">La Serena / Ovalle</option>
                <option value="Concepción">Concepción</option>
              </select>
            </div>

          </div>

          {/* Quick Filters Reset */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-bold flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-[#C87A32]" />
                Filtros activos: {filteredProperties.length} propiedades
              </span>
            </div>
            <button
              onClick={() => {
                setSelectedType('todas');
                setSelectedOperation('todas');
                setSelectedCity('todas');
                searchQuery('');
              }}
              className="px-3 py-1 rounded bg-white hover:bg-slate-200 text-slate-700 border border-slate-300 transition-colors font-medium"
            >
              Restablecer Filtros
            </button>
          </div>
        </div>

        {/* LOADING STATE */}
        {isLoading && (
          <div className="py-24 text-center bg-slate-50 border border-slate-200 rounded-2xl space-y-4 shadow-sm">
            <Loader2 className="w-10 h-10 text-[#C87A32] animate-spin mx-auto" />
            <h3 className="text-xl font-extrabold text-[#0B1E36]">
              Cargando catálogo en tiempo real...
            </h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto">
              Obteniendo cartera de inmuebles.
            </p>
          </div>
        )}

        {/* EMPTY STATE OR NO ACTIVE PROPERTIES */}
        {!isLoading && properties.length === 0 && (
          <div className="py-16 px-6 text-center bg-slate-50 border border-slate-200 rounded-2xl space-y-6 max-w-3xl mx-auto shadow-sm">
            <div className="w-16 h-16 bg-[#C87A32]/10 rounded-full flex items-center justify-center mx-auto text-[#C87A32]">
              <AlertCircle className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-[#0B1E36]">
                Catálogo en Actualización
              </h3>
              <p className="text-slate-700 text-base leading-relaxed font-medium">
                Actualmente no hay inmuebles publicados en el catálogo. Contáctanos directamente a nuestro WhatsApp para consultas personalizadas.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => fetchCatalogData(true)}
                disabled={isRefreshing}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0B1E36] hover:bg-slate-800 text-white font-bold text-sm shadow transition-all"
              >
                <RefreshCw className={`w-4 h-4 text-[#C87A32] ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Recargar catálogo</span>
              </button>

              <a
                href={`https://wa.me/${PHONE_WHATSAPP.replace('+', '')}?text=${encodeURIComponent('Hola Tamar Propiedades SpA, quisiera solicitar información sobre inmuebles no publicados en catálogo.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#C87A32] hover:bg-[#A85D23] text-white font-bold text-sm shadow transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Consultar por WhatsApp</span>
              </a>
            </div>
          </div>
        )}

        {/* PROPERTIES GRID */}
        {!isLoading && properties.length > 0 && filteredProperties.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <p className="text-slate-700 text-lg font-semibold">
              No se encontraron propiedades con los filtros aplicados.
            </p>
            <p className="text-slate-500 text-sm">
              Prueba cambiando el tipo de propiedad, la ubicación o limpia el buscador.
            </p>
            <button
              onClick={() => {
                setSelectedType('todas');
                setSelectedOperation('todas');
                setSelectedCity('todas');
                searchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#C87A32] text-white text-xs font-bold rounded-lg uppercase shadow"
            >
              Ver Todas las Propiedades
            </button>
          </div>
        )}

        {!isLoading && filteredProperties.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-[#C87A32]/60 transition-all duration-300 shadow-md hover:shadow-xl flex flex-col justify-between group"
              >
                <div>
                  {/* Property Image & Badges */}
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

                    {/* Badges: operacion (Cobre #C87A32) & categoria (Azul #0B1E36) */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider text-white shadow-md bg-[#C87A32]">
                        En {property.operation}
                      </span>
                      <span className="px-3 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider text-white shadow-md bg-[#0B1E36]">
                        {property.category || property.type}
                      </span>
                    </div>

                    {/* Price Tag Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between">
                      <div>
                        <span className="text-2xl font-black text-white tracking-tight drop-shadow-md">
                          {property.priceUF > 0 ? `${property.priceUF.toLocaleString('es-CL')} UF` : 'Consultar UF'}
                        </span>
                        {property.priceCLP > 0 && (
                          <span className="text-xs text-slate-200 block font-semibold drop-shadow-sm">
                            ≈ ${property.priceCLP.toLocaleString('es-CL')} CLP
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => openPropertyModal(property)}
                        className="p-2.5 rounded-xl bg-white/90 hover:bg-[#C87A32] text-slate-800 hover:text-white border border-slate-200 transition-colors shadow-md"
                        title="Ver Ficha Técnica"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-4">
                    
                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#C87A32]">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{property.location}</span>
                    </div>

                    {/* Title */}
                    <h3 
                      onClick={() => openPropertyModal(property)}
                      className="text-lg font-extrabold text-[#0B1E36] group-hover:text-[#C87A32] transition-colors cursor-pointer line-clamp-1"
                    >
                      {property.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {property.description}
                    </p>

                    {/* Key Specs */}
                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200 text-xs text-slate-700 font-semibold">
                      <div className="flex items-center gap-1">
                        <Bed className="w-3.5 h-3.5 text-[#C87A32]" />
                        <span>{property.bedrooms !== undefined ? `${property.bedrooms} Dorms` : 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="w-3.5 h-3.5 text-[#C87A32]" />
                        <span>{property.bathrooms !== undefined ? `${property.bathrooms} Baños` : 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Maximize className="w-3.5 h-3.5 text-[#C87A32]" />
                        <span>{property.areaM2 > 0 ? `${property.areaM2} m²` : 'Consultar'}</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 pt-0 space-y-2">
                  <button
                    onClick={() => openPropertyModal(property)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider bg-[#0B1E36] hover:bg-slate-800 text-white shadow transition-all"
                  >
                    <Eye className="w-4 h-4 text-[#C87A32]" />
                    <span>Ver Ficha Técnica</span>
                  </button>

                  <a
                    href={generateWhatsAppLink(property)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#C87A32] hover:bg-[#A85D23] text-white shadow transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Cotizar por WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* TECHNICAL SHEET MODAL */}
      {activeProperty && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full p-5 sm:p-6 space-y-6 relative shadow-2xl mt-4 sm:mt-10 mb-10 animate-in fade-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setActiveProperty(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/90 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors shadow"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Gallery Carousel */}
            <div className="space-y-3">
              <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden bg-slate-900">
                <img
                  src={activeProperty.gallery?.[activePhotoIndex] || activeProperty.image}
                  alt={activeProperty.title}
                  className="w-full h-full object-cover"
                />

                {/* Operation & Category Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-3 py-1 rounded bg-[#C87A32] text-white text-xs font-extrabold uppercase shadow">
                    En {activeProperty.operation}
                  </span>
                  <span className="px-3 py-1 rounded bg-[#0B1E36] text-white text-xs font-extrabold uppercase shadow">
                    {activeProperty.category || activeProperty.type}
                  </span>
                </div>

                {/* Navigation Arrows if gallery has > 1 image */}
                {activeProperty.gallery && activeProperty.gallery.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActivePhotoIndex((prev) =>
                          prev === 0 ? activeProperty.gallery!.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() =>
                        setActivePhotoIndex((prev) =>
                          prev === activeProperty.gallery!.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-md font-semibold">
                      Foto {activePhotoIndex + 1} de {activeProperty.gallery.length}
                    </div>
                  </>
                )}
              </div>

              {/* Gallery Thumbnails */}
              {activeProperty.gallery && activeProperty.gallery.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {activeProperty.gallery.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhotoIndex(idx)}
                      className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                        activePhotoIndex === idx
                          ? 'border-[#C87A32] scale-105 shadow-md'
                          : 'border-slate-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Video Player Section */}
            {activeProperty.videoUrl && (
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B1E36] flex items-center gap-1.5">
                  <Film className="w-4 h-4 text-[#C87A32]" />
                  Recorrido en Video:
                </h4>
                {activeProperty.videoUrl.includes('youtube.com') || activeProperty.videoUrl.includes('youtu.be') ? (
                  <iframe
                    src={getEmbedVideoUrl(activeProperty.videoUrl) || activeProperty.videoUrl}
                    title="Video Recorrido Propiedad"
                    className="w-full h-56 sm:h-72 rounded-xl border border-slate-300 shadow"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video
                    src={activeProperty.videoUrl}
                    controls
                    className="w-full h-56 sm:h-72 rounded-xl border border-slate-300 bg-black"
                  />
                )}
              </div>
            )}

            {/* Content Specifications */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#C87A32]">
                <MapPin className="w-4 h-4" />
                <span>{activeProperty.location} ({activeProperty.region})</span>
              </div>

              <h3 className="text-2xl font-extrabold text-[#0B1E36]">
                {activeProperty.title}
              </h3>

              <div className="flex flex-wrap items-baseline gap-4 py-3 border-y border-slate-200">
                <span className="text-3xl font-extrabold text-[#C87A32]">
                  {activeProperty.priceUF > 0 ? `${activeProperty.priceUF.toLocaleString('es-CL')} UF` : 'Consultar UF'}
                </span>
                {activeProperty.priceCLP > 0 && (
                  <span className="text-sm text-slate-600 font-semibold">
                    Valor estimado: ${activeProperty.priceCLP.toLocaleString('es-CL')} CLP
                  </span>
                )}
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Descripción del Inmueble:
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeProperty.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Especificaciones & Equipamiento:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {activeProperty.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200 font-medium">
                      <Check className="w-4 h-4 text-[#C87A32] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href={generateWhatsAppLink(activeProperty)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-extrabold text-sm bg-[#C87A32] hover:bg-[#A85D23] text-white shadow-lg transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Cotizar Propiedad ID #{activeProperty.id} por WhatsApp</span>
                </a>
                <button
                  onClick={() => setActiveProperty(null)}
                  className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  Cerrar Ficha
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
