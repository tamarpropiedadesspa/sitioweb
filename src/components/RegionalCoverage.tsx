import React from 'react';
import { REGIONAL_COVERAGE } from '../data/mockData';
import { MapPin, Globe } from 'lucide-react';

export const RegionalCoverage: React.FC = () => {
  return (
    <section id="cobertura" className="py-20 bg-white text-slate-800 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de la sección */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#C87A32]/10 text-[#C87A32] border border-[#C87A32]/30">
            Presencia Geográfica Extensa
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E36] font-sans">
            Cobertura Nacional e Internacional
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Operamos con centros logísticos e inmobiliarios directos de Iquique a Concepción, ampliando nuestro alcance a Bolivia y Perú.
          </p>
        </div>

        {/* Rejilla de Regiones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REGIONAL_COVERAGE.map((region) => (
            <div
              key={region.name}
              className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between transition-all hover:border-[#C87A32]/70 shadow-md"
            >
              <div className="space-y-4">
                
                {/* País e Ícono */}
                <div className="flex items-center gap-2">
                  {region.country === 'Chile' ? (
                    <MapPin className="w-5 h-5 text-[#C87A32]" />
                  ) : (
                    <Globe className="w-5 h-5 text-amber-600" />
                  )}
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {region.country}
                  </span>
                </div>

                {/* Título y descripción */}
                <h3 className="text-xl font-extrabold text-[#0B1E36] font-sans">
                  {region.name}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {region.description}
                </p>

                {/* Ciudades / Hubs */}
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Ciudades & Hubs Clave:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {region.hubs.map((hub, i) => (
                      <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200 font-medium">
                        {hub}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
