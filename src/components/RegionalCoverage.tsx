import React from 'react';
import { REGIONAL_COVERAGE } from '../data/mockData';
import { MapPin, Globe, CheckCircle } from 'lucide-react';

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

        {/* Rejilla de Regiones sin botones de filtro */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REGIONAL_COVERAGE.map((region) => (
            <div
              key={region.name}
              className={`bg-white border rounded-2xl p-6 flex flex-col justify-between transition-all hover:border-[#C87A32]/70 shadow-md ${
                region.isMainBase ? 'border-[#C87A32]/50 bg-amber-50/20' : 'border-slate-200'
              }`}
            >
              <div className="space-y-4">
                
                <div className="flex items-center justify-between">
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

                  {region.isMainBase && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C87A32] bg-[#C87A32]/10 px-2 py-0.5 rounded border border-[#C87A32]/30">
                  )}
                </div>

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

                {/* Servicios */}
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Servicios en la Zona:
                  </span>
                  <div className="space-y-1 text-xs text-slate-700">
                    {region.serviceTypes.map((st, i) => (
                      <div key={i} className="flex items-center gap-2 font-medium">
                        <CheckCircle className="w-3.5 h-3.5 text-[#C87A32]" />
                        <span>{st}</span>
                      </div>
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
