import React, { useState, useMemo } from 'react';
import { Property, PropertyType, OperationType } from '../types';
import { MOCK_PROPERTIES, PHONE_WHATSAPP } from '../data/mockData';
import { MapPin, Bed, Bath, Maximize, Phone, ExternalLink, Filter, Search, X, Check, Eye } from 'lucide-react';

interface PropertyCatalogProps {
  initialTypeFilter?: string;
  initialCityFilter?: string;
}

export const PropertyCatalog: React.FC<PropertyCatalogProps> = ({
  initialTypeFilter = 'todas',
  initialCityFilter = 'todas',
}) => {
  const [selectedType, setSelectedType] = useState<string>(initialTypeFilter);
  const [selectedOperation, setSelectedOperation] = useState<string>('todas');
  const [selectedCity, setSelectedCity] = useState<string>(initialCityFilter);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);

  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter((prop) => {
      // Type match
      if (selectedType !== 'todas' && prop.type !== selectedType) {
        return false;
      }
      // Operation match
      if (selectedOperation !== 'todas' && prop.operation !== selectedOperation) {
        return false;
      }
      // City match
      if (selectedCity !== 'todas' && !prop.region.toLowerCase().includes(selectedCity.toLowerCase())) {
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
  }, [selectedType, selectedOperation, selectedCity, searchQuery]);

  const generateWhatsAppLink = (property: Property) => {
    const text = `Hola Tamar Propiedades SpA, me interesa cotizar la propiedad ID "${property.id}": ${property.title} en ${property.location} (Precio: UF ${property.priceUF.toLocaleString('es-CL')} / $${property.priceCLP.toLocaleString('es-CL')}). Por favor enviar más detalles.`;
    return `https://wa.me/${PHONE_WHATSAPP.replace('+', '')}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="propiedades" className="py-20 bg-white text-slate-800 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#C87A32]/10 text-[#C87A32] border border-[#C87A32]/30">
              Catálogo de Oportunidades
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E36] font-sans">
              Propiedades & Paños Destacados
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl">
              Explora nuestra cartera de propiedades residenciales e industriales con información detallada y cotización inmediata por WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">
              Mostrando {filteredProperties.length} propiedades
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl mb-10 space-y-4 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Buscar por ciudad, tipo o palabras clave..."
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

          {/* Quick Filter Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 text-xs">
            <span className="text-slate-500 font-bold flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Accesos directos:
            </span>
            <button
              onClick={() => { setSelectedType('todas'); setSelectedOperation('todas'); setSelectedCity('todas'); setSearchQuery(''); }}
              className="px-2.5 py-1 rounded bg-white hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors font-medium"
            >
              Restablecer Filtros
            </button>
            <button
              onClick={() => { setSelectedType('residencial'); setSelectedOperation('venta'); }}
              className={`px-2.5 py-1 rounded border transition-colors font-semibold ${selectedType === 'residencial' ? 'bg-[#C87A32]/10 border-[#C87A32] text-[#C87A32]' : 'bg-white border-slate-200 text-slate-700'}`}
            >
              Casas en Venta
            </button>
            <button
              onClick={() => { setSelectedType('industrial'); setSelectedOperation('arriendo'); }}
              className={`px-2.5 py-1 rounded border transition-colors font-semibold ${selectedType === 'industrial' ? 'bg-[#C87A32]/10 border-[#C87A32] text-[#C87A32]' : 'bg-white border-slate-200 text-slate-700'}`}
            >
              Terrenos Mineros / Arriendo
            </button>
            <button
              onClick={() => { setSelectedType('departamento'); }}
              className={`px-2.5 py-1 rounded border transition-colors font-semibold ${selectedType === 'departamento' ? 'bg-[#C87A32]/10 border-[#C87A32] text-[#C87A32]' : 'bg-white border-slate-200 text-slate-700'}`}
            >
              Departamentos Ejecutivos
            </button>
          </div>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <p className="text-slate-700 text-lg font-semibold">No se encontraron propiedades con los filtros seleccionados.</p>
            <p className="text-slate-500 text-sm">Prueba ajustando los criterios de búsqueda o consulta directamente por WhatsApp.</p>
            <button
              onClick={() => { setSelectedType('todas'); setSelectedOperation('todas'); setSelectedCity('todas'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 bg-[#C87A32] text-white text-xs font-bold rounded-lg uppercase"
            >
              Ver Todas las Propiedades
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-[#C87A32]/60 transition-all duration-300 shadow-md hover:shadow-xl flex flex-col justify-between group"
              >
                <div>
                  {/* Property Image & Badges */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

                    {/* Operation Badge */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-3 py-1 rounded-md text-xs font-extrabold uppercase tracking-wider text-white shadow-md bg-[#C87A32]">
                        En {property.operation}
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-white/90 text-[#0B1E36] border border-slate-200 backdrop-blur-md">
                        {property.type}
                      </span>
                    </div>

                    {/* Price Tag Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between">
                      <div>
                        <span className="text-2xl font-black text-white tracking-tight drop-shadow-md">
                          UF {property.priceUF.toLocaleString('es-CL')}
                        </span>
                        <span className="text-xs text-slate-200 block font-semibold drop-shadow-sm">
                          ≈ ${property.priceCLP.toLocaleString('es-CL')} CLP
                        </span>
                      </div>

                      <button
                        onClick={() => setActiveProperty(property)}
                        className="p-2 rounded-lg bg-white/90 hover:bg-[#C87A32] text-slate-800 hover:text-white border border-slate-200 transition-colors shadow"
                        title="Ver ficha completa"
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
                      onClick={() => setActiveProperty(property)}
                      className="text-lg font-extrabold text-[#0B1E36] group-hover:text-[#C87A32] transition-colors cursor-pointer line-clamp-1"
                    >
                      {property.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {property.description}
                    </p>

                    {/* Features Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {property.features.slice(0, 3).map((feat, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded border border-slate-200">
                          {feat}
                        </span>
                      ))}
                    </div>

                    {/* Key Specs */}
                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200 text-xs text-slate-700 font-semibold">
                      {property.bedrooms !== undefined && (
                        <div className="flex items-center gap-1">
                          <Bed className="w-3.5 h-3.5 text-[#C87A32]" />
                          <span>{property.bedrooms} Dorms</span>
                        </div>
                      )}
                      {property.bathrooms !== undefined && (
                        <div className="flex items-center gap-1">
                          <Bath className="w-3.5 h-3.5 text-[#C87A32]" />
                          <span>{property.bathrooms} Baños</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 col-span-1">
                        <Maximize className="w-3.5 h-3.5 text-[#C87A32]" />
                        <span>{property.areaM2} m²</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 pt-0 space-y-2">
                  <a
                    href={generateWhatsAppLink(property)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#C87A32] hover:bg-[#A85D23] text-white shadow transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Cotizar por WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setActiveProperty(property)}
                    className="w-full py-1.5 text-xs text-slate-500 hover:text-[#0B1E36] font-semibold transition-colors"
                  >
                    Ver especificaciones completas →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Property Details Lightbox Modal */}
      {activeProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 space-y-6 relative shadow-2xl my-8 animate-in fade-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setActiveProperty(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64 rounded-xl overflow-hidden">
              <img
                src={activeProperty.image}
                alt={activeProperty.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-3 py-1 rounded bg-[#C87A32] text-white text-xs font-bold uppercase">
                  En {activeProperty.operation}
                </span>
                <span className="px-3 py-1 rounded bg-white text-[#0B1E36] text-xs font-extrabold uppercase border border-slate-200">
                  {activeProperty.type}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#C87A32]">
                <MapPin className="w-4 h-4" />
                <span>{activeProperty.location} ({activeProperty.region})</span>
              </div>

              <h3 className="text-2xl font-extrabold text-[#0B1E36]">
                {activeProperty.title}
              </h3>

              <div className="flex items-baseline gap-4 py-2 border-y border-slate-200">
                <span className="text-3xl font-extrabold text-[#C87A32]">
                  UF {activeProperty.priceUF.toLocaleString('es-CL')}
                </span>
                <span className="text-sm text-slate-600 font-semibold">
                  Valor estimado: ${activeProperty.priceCLP.toLocaleString('es-CL')} CLP
                </span>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                {activeProperty.description}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Características Destacadas:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {activeProperty.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 bg-slate-50 p-2 rounded border border-slate-200 font-medium">
                      <Check className="w-4 h-4 text-[#C87A32]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href={generateWhatsAppLink(activeProperty)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-[#C87A32] hover:bg-[#A85D23] text-white shadow-lg transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Cotizar Propiedad por WhatsApp</span>
                </a>
                <button
                  onClick={() => setActiveProperty(null)}
                  className="px-6 py-3 rounded-xl font-semibold text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  Cerrar
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
