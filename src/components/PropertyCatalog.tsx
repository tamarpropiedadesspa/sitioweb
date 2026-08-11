import React, { useState, useEffect, useMemo } from 'react';
import { Property } from '../types';
import { PHONE_WHATSAPP } from '../data/mockData';
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
  Navigation,
} from 'lucide-react';

interface PropertyCatalogProps {
  initialTypeFilter?: string;
  initialCityFilter?: string;
}

const GOOGLE_SHEETS_API_URL =
  'https://script.google.com/macros/s/AKfycbySaFOp9uBU4pUFjS8697tXYnDCC7BittaPN5GR-MzyyYybPhhAQOx9qsbXJ-A_7GGrZA/exec';

const DEFAULT_FALLBACK_IMG =
  'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1000&q=80';

// Convierte enlaces de Google Drive a URLs de servidor directo
const formatImageUrl = (url?: string): string => {
  if (!url || typeof url !== 'string' || !url.trim()) return DEFAULT_FALLBACK_IMG;
  const cleanUrl = url.trim();

  if (cleanUrl.includes('drive.google.com') || cleanUrl.includes('docs.google.com')) {
    const match = cleanUrl.match(/\/d\/([a-zA-Z0-9_-]+)/) || cleanUrl.match(/id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
  }

  return cleanUrl;
};

// Genera una versión liviana (~15 KB) para miniaturas si la imagen viene de Google Drive
const getThumbnailUrl = (url: string): string => {
  if (url.includes('lh3.googleusercontent.com/d/')) {
    return `${url}=w200-h150-c`;
  }
  return url;
};

export const PropertyCatalog: React.FC<PropertyCatalogProps> = ({
  initialTypeFilter = 'todas',
  initialCityFilter = 'todas',
}) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [ufRate, setUfRate] = useState<number>(38500); // Tasa UF por defecto

  // Filters
  const [selectedType, setSelectedType] = useState<string>(initialTypeFilter);
  const [selectedOperation, setSelectedOperation] = useState<string>('todas');
  const [selectedCity, setSelectedCity] = useState<string>(initialCityFilter);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal / Lightbox State
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  // Modal para Elegir App de Navegación ("Cómo llegar")
  const [navigationModalProperty, setNavigationModalProperty] = useState<Property | null>(null);

  // Obtener valor UF en tiempo real para conversiones dinámicas
  useEffect(() => {
    const fetchUF = async () => {
      try {
        const res = await fetch('https://mindicador.cl/api/uf');
        if (res.ok) {
          const data = await res.json();
          if (data?.serie?.[0]?.valor) {
            setUfRate(Math.round(data.serie[0].valor));
            return;
          }
        }
      } catch (e) {}

      try {
        const res2 = await fetch('https://cl.dolarapi.com/v1/uf');
        if (res2.ok) {
          const data2 = await res2.json();
          if (data2?.valor) {
            setUfRate(Math.round(data2.valor));
            return;
          }
        }
      } catch (e2) {}
    };

    fetchUF();
  }, []);

  // Función de cálculo inteligente de precios con auto-conversión en vivo
  const getDisplayPrices = (priceUF: number, priceCLP: number) => {
    let finalUF = priceUF;
    let finalCLP = priceCLP;

    // Si ingresó UF pero no CLP -> Calcula CLP automáticamente
    if (priceUF > 0 && priceCLP === 0 && ufRate > 0) {
      finalCLP = Math.round(priceUF * ufRate);
    }
    // Si ingresó CLP pero no UF -> Calcula UF automáticamente
    else if (priceCLP > 0 && priceUF === 0 && ufRate > 0) {
      finalUF = parseFloat((priceCLP / ufRate).toFixed(1));
    }

    return { finalUF, finalCLP };
  };

  // Fetch real-time data from Google Sheets API
  const fetchCatalogData = async (isManualRefresh = false, isBackgroundRefetch = false) => {
    if (isManualRefresh) {
      setIsRefreshing(true);
    } else if (!isBackgroundRefetch && properties.length === 0) {
      setIsLoading(true);
    }
    setApiError(null);

    try {
      const response = await fetch(GOOGLE_SHEETS_API_URL, {
        method: 'GET',
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('La URL del WebApp de Google Script no fue encontrada (404).');
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

      // Filter only properties with state = 'Activo'
      const activeItems = rawItems.filter((item) => {
        if (!item) return false;
        if (!item.estado && !item.state && !item.status) return true;
        const estadoStr = String(item.estado || item.state || item.status || '').trim().toLowerCase();
        return estadoStr === 'activo' || estadoStr === 'active' || estadoStr === 'publicado' || estadoStr === 'true';
      });

      // Map raw sheet items to normalized Property interface
      const mapped: Property[] = activeItems.map((item, index) => {
        const gallery: string[] = [];

        const mainPhoto = formatImageUrl(item.foto_principal || item.foto1 || item.foto_1 || item.imagen || item.image);
        if (mainPhoto) {
          gallery.push(mainPhoto);
        }

        for (let i = 1; i <= 10; i++) {
          const photoKey = item[`foto_${i}`] || item[`foto${i}`];
          if (photoKey && typeof photoKey === 'string' && photoKey.trim()) {
            const formatted = formatImageUrl(photoKey);
            if (!gallery.includes(formatted)) {
              gallery.push(formatted);
            }
          }
        }

        if (item.galeria_fotos) {
          if (Array.isArray(item.galeria_fotos)) {
            item.galeria_fotos.forEach((url: any) => {
              const formatted = formatImageUrl(url);
              if (formatted && !gallery.includes(formatted)) {
                gallery.push(formatted);
              }
            });
          } else if (typeof item.galeria_fotos === 'string') {
            item.galeria_fotos.split(',').forEach((url: string) => {
              const formatted = formatImageUrl(url);
              if (formatted && !gallery.includes(formatted)) {
                gallery.push(formatted);
              }
            });
          }
        }

        const image = gallery[0] || DEFAULT_FALLBACK_IMG;

        const features: string[] = [];
        if (Array.isArray(item.caracteristicas)) {
          item.caracteristicas.forEach((f: any) => typeof f === 'string' && features.push(f));
        } else if (typeof item.caracteristicas === 'string' && item.caracteristicas.trim()) {
          item.caracteristicas.split(',').forEach((f: string) => features.push(f.trim()));
        }

        const priceUF = parseFloat(item.precio_uf || item.precioUF || item.priceUF || 0);
        const priceCLP = parseFloat(item.precio_clp || item.precioCLP || item.priceCLP || 0);

        const destStr = String(item.destacado || item.featured || '').trim().toLowerCase();
        const isFeatured = ['si', 'sí', 'true', '1'].includes(destStr);

        const rawCategory = String(item.categoria || item.category || '').trim();

        return {
          id: String(item.id || item.ID || item.id_propiedad || index + 1),
          title: item.titulo || item.title || 'Propiedad Tamar',
          type: String(item.tipo || item.type || 'residencial').toLowerCase(),
          category: rawCategory,
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
          mapUrl: item.ubicacion_maps || item.mapa || item.coordenadas || undefined,
          featured: isFeatured,
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
    fetchCatalogData(false, false);

    const intervalId = setInterval(() => {
      fetchCatalogData(false, true);
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const availableCities = useMemo(() => {
    const citiesSet = new Set<string>();
    properties.forEach((prop) => {
      const city = prop.location.trim();
      if (city && city.toLowerCase() !== 'chile') {
        citiesSet.add(city);
      }
    });
    return Array.from(citiesSet).sort();
  }, [properties]);

  const filteredProperties = useMemo(() => {
    const list = properties.filter((prop) => {
      if (selectedType !== 'todas' && prop.type !== selectedType) {
        return false;
      }
      if (selectedOperation !== 'todas' && prop.operation !== selectedOperation) {
        return false;
      }
      if (selectedCity !== 'todas') {
        const propLocation = prop.location.toLowerCase().trim();
        if (propLocation !== selectedCity.toLowerCase()) {
          return false;
        }
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(query);
        const matchesLocation = prop.location.toLowerCase().includes(query);
        const matchesDesc = prop.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLocation && !matchesDesc) return false;
      }
      return true;
    });

    return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }, [properties, selectedType, selectedOperation, selectedCity, searchQuery]);

  const generateWhatsAppLink = (property: Property) => {
    const text = `Hola Tamar Propiedades, quiero cotizar la propiedad ID #${property.id}: ${property.title}`;
    return `https://wa.me/${PHONE_WHATSAPP.replace('+', '')}?text=${encodeURIComponent(text)}`;
  };

  const openPropertyModal = (property: Property) => {
    setActiveProperty(property);
    setActivePhotoIndex(0);

    // Precargar todas las imágenes de la galería en memoria
    if (property.gallery) {
      property.gallery.forEach((url) => {
        const img = new Image();
        img.src = url;
      });
    }
  };

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

  const getNavLinks = (locationOrCoords?: string) => {
    if (!locationOrCoords) return null;
    const trimmed = locationOrCoords.trim();

    const coordRegex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
    const isCoords = coordRegex.test(trimmed);

    if (isCoords) {
      const [lat, lng] = trimmed.split(',').map((s) => s.trim());
      return {
        google: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
        waze: `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`,
        apple: `https://maps.apple.com/?daddr=${lat},${lng}`,
      };
    }

    if (trimmed.startsWith('http')) {
      return {
        google: trimmed,
        waze: `https://waze.com/ul?q=${encodeURIComponent(trimmed)}&navigate=yes`,
        apple: trimmed,
      };
    }

    const encoded = encodeURIComponent(trimmed);
    return {
      google: `https://www.google.com/maps/dir/?api=1&destination=${encoded}`,
      waze: `https://waze.com/ul?q=${encoded}&navigate=yes`,
      apple: `https://maps.apple.com/?daddr=${encoded}`,
    };
  };

  const handleNavigationClick = (property: Property) => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      setNavigationModalProperty(property);
    } else {
      const navs = getNavLinks(property.mapUrl);
      if (navs && navs.google) {
        window.open(navs.google, '_blank', 'noopener,noreferrer');
      }
    }
  };

  return (
    <section id="propiedades" className="py-20 bg-white text-slate-800 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E36] font-sans">
              Propiedades & Terrenos
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl">
              Explora nuestra cartera actualizada en tiempo real con ficha técnica completa y contacto directo por WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchCatalogData(true, false)}
              disabled={isRefreshing || isLoading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0B1E36] font-bold text-xs border border-slate-300 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
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
              onClick={() => fetchCatalogData(true, false)}
              className="shrink-0 px-3 py-1.5 bg-[#C87A32] text-white rounded-lg font-bold hover:bg-[#A85D23] transition-colors cursor-pointer"
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
                className="w-full bg-white border border-slate-300 text-slate-800 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#C87A32] cursor-pointer"
              >
                <option value="todas">Tipo: Todos</option>
                <option value="residencial">Casas</option>
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
                className="w-full bg-white border border-slate-300 text-slate-800 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#C87A32] cursor-pointer"
              >
                <option value="todas">Operación: Todas</option>
                <option value="venta">En Venta</option>
                <option value="arriendo">En Arriendo</option>
              </select>
            </div>

            {/* Region Filter Dinámico */}
            <div>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-white border border-slate-300 text-slate-800 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#C87A32] cursor-pointer"
              >
                <option value="todas">Zona: Todo Chile</option>
                {availableCities.map((city, idx) => (
                  <option key={idx} value={city}>
                    {city}
                  </option>
                ))}
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
                setSearchQuery('');
              }}
              className="px-3 py-1 rounded bg-white hover:bg-slate-200 text-slate-700 border border-slate-300 transition-colors font-medium cursor-pointer"
            >
              Restablecer Filtros
            </button>
          </div>
        </div>

        {/* INITIAL LOADING STATE: SKELETON LOADER */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((skeleton) => (
              <div
                key={skeleton}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm animate-pulse flex flex-col justify-between"
              >
                <div>
                  <div className="h-56 bg-slate-200 w-full" />
                  <div className="p-5 space-y-4">
                    <div className="h-3 bg-slate-200 rounded w-1/3" />
                    <div className="h-5 bg-slate-200 rounded w-3/4" />
                    <div className="h-3 bg-slate-200 rounded w-full" />
                    <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2">
                      <div className="h-4 bg-slate-200 rounded" />
                      <div className="h-4 bg-slate-200 rounded" />
                      <div className="h-4 bg-slate-200 rounded" />
                    </div>
                  </div>
                </div>
                <div className="p-5 pt-0 space-y-2">
                  <div className="h-9 bg-slate-200 rounded-xl w-full" />
                  <div className="h-9 bg-slate-200 rounded-xl w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
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
                onClick={() => fetchCatalogData(true, false)}
                disabled={isRefreshing}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0B1E36] hover:bg-slate-800 text-white font-bold text-sm shadow transition-all cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 text-[#C87A32] ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Recargar catálogo</span>
              </button>

              <a
                href={`https://wa.me/${PHONE_WHATSAPP.replace('+', '')}?text=${encodeURIComponent('Hola Tamar Propiedades SpA, quisiera solicitar información sobre inmuebles no publicados en catálogo.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#C87A32] hover:bg-[#A85D23] text-white font-bold text-sm shadow transition-all cursor-pointer"
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
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#C87A32] text-white text-xs font-bold rounded-lg uppercase shadow cursor-pointer"
            >
              Ver Todas las Propiedades
            </button>
          </div>
        )}

        {!isLoading && filteredProperties.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => {
              const { finalUF, finalCLP } = getDisplayPrices(property.priceUF, property.priceCLP);

              return (
                <div
                  key={property.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-[#C87A32]/60 transition-all duration-300 shadow-md hover:shadow-xl flex flex-col justify-between group"
                >
                  <div>
                    {/* Property Image & Badges */}
                    <div 
                      className="relative h-56 overflow-hidden bg-slate-100 cursor-pointer"
                      onClick={() => openPropertyModal(property)}
                    >
                      <img
                        src={getThumbnailUrl(property.image)}
                        alt={property.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = DEFAULT_FALLBACK_IMG;
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider text-white shadow-md bg-[#C87A32]">
                          En {property.operation}
                        </span>
                        {property.category ? (
                          <span className="px-3 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider text-white shadow-md bg-[#0B1E36]">
                            {property.category}
                          </span>
                        ) : null}
                      </div>

                      {/* Price Tag Overlay CON AUTO-CONVERSIÓN DINÁMICA */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between">
                        <div>
                          {finalUF > 0 && finalCLP > 0 ? (
                            <>
                              <span className="text-2xl font-black text-white tracking-tight drop-shadow-md">
                                {finalUF.toLocaleString('es-CL')} UF
                              </span>
                              <span className="text-xs text-slate-200 block font-semibold drop-shadow-sm">
                                ≈ ${finalCLP.toLocaleString('es-CL')} CLP
                              </span>
                            </>
                          ) : finalUF > 0 ? (
                            <span className="text-2xl font-black text-white tracking-tight drop-shadow-md">
                              {finalUF.toLocaleString('es-CL')} UF
                            </span>
                          ) : finalCLP > 0 ? (
                            <span className="text-2xl font-black text-white tracking-tight drop-shadow-md">
                              ${finalCLP.toLocaleString('es-CL')} CLP
                            </span>
                          ) : (
                            <span className="text-2xl font-black text-white tracking-tight drop-shadow-md">
                              Consultar valor
                            </span>
                          )}
                        </div>
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
                          {property.bedrooms && property.bedrooms > 0 ? (
                            <>
                              <Bed className="w-3.5 h-3.5 text-[#C87A32]" />
                              <span>{property.bedrooms} Dorms</span>
                            </>
                          ) : null}
                        </div>
                        <div className="flex items-center gap-1">
                          {property.bathrooms && property.bathrooms > 0 ? (
                            <>
                              <Bath className="w-3.5 h-3.5 text-[#C87A32]" />
                              <span>{property.bathrooms} Baños</span>
                            </>
                          ) : null}
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
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider bg-[#0B1E36] hover:bg-slate-800 text-white shadow transition-all cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-[#C87A32]" />
                      <span>Más información</span>
                    </button>

                    <a
                      href={generateWhatsAppLink(property)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#C87A32] hover:bg-[#A85D23] text-white shadow transition-all cursor-pointer"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Cotizar por WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* TECHNICAL SHEET MODAL */}
      {activeProperty && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full p-5 sm:p-6 space-y-6 relative shadow-2xl mt-4 sm:mt-10 mb-10 animate-in fade-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setActiveProperty(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-lg bg-white/90 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors shadow cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Gallery Carousel */}
            <div className="space-y-3">
              <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
                
                {/* Fondo difuminado rico para rellenar bordes si la foto es vertical/cuadrada */}
                <img
                  src={activeProperty.gallery?.[activePhotoIndex] || activeProperty.image}
                  alt=""
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = DEFAULT_FALLBACK_IMG;
                  }}
                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-80 scale-125 pointer-events-none"
                />

                {/* Imagen Principal COMPLETA */}
                <img
                  src={activeProperty.gallery?.[activePhotoIndex] || activeProperty.image}
                  alt={activeProperty.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = DEFAULT_FALLBACK_IMG;
                  }}
                  className="relative z-10 max-h-full max-w-full object-contain mx-auto shadow-2xl rounded-sm"
                />

                {/* Operation & Category Badges */}
                <div className="absolute top-3 left-3 z-20 flex gap-2">
                  <span className="px-3 py-1 rounded bg-[#C87A32] text-white text-xs font-extrabold uppercase shadow">
                    En {activeProperty.operation}
                  </span>
                  {activeProperty.category ? (
                    <span className="px-3 py-1 rounded bg-[#0B1E36] text-white text-xs font-extrabold uppercase shadow">
                      {activeProperty.category}
                    </span>
                  ) : null}
                </div>

                {/* Navigation Arrows */}
                {activeProperty.gallery && activeProperty.gallery.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActivePhotoIndex((prev) =>
                          prev === 0 ? activeProperty.gallery!.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-all cursor-pointer shadow-lg"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() =>
                        setActivePhotoIndex((prev) =>
                          prev === activeProperty.gallery!.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-all cursor-pointer shadow-lg"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-3 right-3 z-20 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-md font-semibold">
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
                      className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 bg-slate-200 transition-all cursor-pointer relative ${
                        activePhotoIndex === idx
                          ? 'border-[#C87A32] scale-105 shadow-md'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={getThumbnailUrl(imgUrl)} 
                        alt={`Thumbnail ${idx}`} 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = DEFAULT_FALLBACK_IMG;
                        }}
                        className="w-full h-full object-cover" 
                      />
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

            {/* Ubicación / Botón "Cómo Llegar" 📍 */}
            {activeProperty.mapUrl && (
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B1E36] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#C87A32]" />
                  Ubicación Exacta:
                </h4>
                
                <button
                  onClick={() => handleNavigationClick(activeProperty)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-amber-50 text-[#C87A32] border border-[#C87A32]/30 hover:bg-[#C87A32] hover:text-white shadow-sm transition-all cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Cómo llegar 📍</span>
                </button>
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

              {/* Lógica de Precios en Ficha Modal con Conversión Dinámica */}
              <div className="flex flex-wrap items-baseline gap-4 py-3 border-y border-slate-200">
                {(() => {
                  const { finalUF, finalCLP } = getDisplayPrices(activeProperty.priceUF, activeProperty.priceCLP);
                  if (finalUF > 0 && finalCLP > 0) {
                    return (
                      <>
                        <span className="text-3xl font-extrabold text-[#C87A32]">
                          {finalUF.toLocaleString('es-CL')} UF
                        </span>
                        <span className="text-sm text-slate-600 font-semibold">
                          Valor estimado: ${finalCLP.toLocaleString('es-CL')} CLP
                        </span>
                      </>
                    );
                  } else if (finalUF > 0) {
                    return (
                      <span className="text-3xl font-extrabold text-[#C87A32]">
                        {finalUF.toLocaleString('es-CL')} UF
                      </span>
                    );
                  } else if (finalCLP > 0) {
                    return (
                      <span className="text-3xl font-extrabold text-[#C87A32]">
                        ${finalCLP.toLocaleString('es-CL')} CLP
                      </span>
                    );
                  } else {
                    return (
                      <span className="text-3xl font-extrabold text-[#C87A32]">
                        Consultar valor
                      </span>
                    );
                  }
                })()}
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
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-extrabold text-sm bg-[#C87A32] hover:bg-[#A85D23] text-white shadow-lg transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Cotizar Propiedad por WhatsApp</span>
                </a>
                <button
                  onClick={() => setActiveProperty(null)}
                  className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                >
                  Cerrar Ficha
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* MODAL ELEGIR APP NAVEGACIÓN ("CÓMO LLEGAR") SÓLO PARA MÓVILES */}
      {navigationModalProperty && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-sm w-full p-6 space-y-5 relative shadow-2xl animate-in zoom-in-95 duration-150 text-center">
            
            <button
              onClick={() => setNavigationModalProperty(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 bg-[#C87A32]/10 rounded-full flex items-center justify-center mx-auto text-[#C87A32]">
              <Navigation className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-[#0B1E36]">
                ¿Con qué app deseas llegar?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Selecciona tu aplicación de mapas favorita para iniciar la ruta.
              </p>
            </div>

            {(() => {
              const navs = getNavLinks(navigationModalProperty.mapUrl);
              if (!navs) return null;

              return (
                <div className="space-y-2.5 pt-2">
                  {/* Google Maps */}
                  <a
                    href={navs.google}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setNavigationModalProperty(null)}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-[#0B1E36] hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer shadow-md"
                  >
                    <span className="flex items-center gap-2">
                      <span>🗺️</span> Google Maps
                    </span>
                    <span className="text-[10px] text-[#C87A32] font-extrabold uppercase">Recomendado</span>
                  </a>

                  {/* Waze */}
                  <a
                    href={navs.waze}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setNavigationModalProperty(null)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 font-bold text-sky-900 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span>🚗</span> Waze
                    </span>
                    <span className="text-[10px] text-sky-600 font-normal">Tráfico en vivo</span>
                  </a>

                  {/* Apple Maps */}
                  <a
                    href={navs.apple}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setNavigationModalProperty(null)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span>🍎</span> Apple Maps
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">iOS / Mac</span>
                  </a>
                </div>
              );
            })()}

          </div>
        </div>
      )}

    </section>
  );
};
