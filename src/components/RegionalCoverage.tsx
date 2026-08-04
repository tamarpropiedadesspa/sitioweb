import React, { useState } from 'react';
import { REGIONAL_COVERAGE } from '../data/mockData';
import { RegionInfo } from '../types';
import { MapPin, Globe, CheckCircle, Navigation, Building, Compass } from 'lucide-react';

export const RegionalCoverage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'norte' | 'centro' | 'sur' | 'internacional'>('all');

  const filteredRegions = REGIONAL_COVERAGE.filter((reg) => {
    if (activeTab === 'norte') return reg.name.includes('Tarapacá') || reg.name.includes('Antofagasta');
    if (activeTab === 'centro') return reg.name.includes('Coquimbo') || reg.name.includes('Valparaíso');
    if (activeTab === 'sur') return reg.name.includes('Bío Bío');
    if (activeTab === 'internacional') return reg.country !== 'Chile';
    return true;
  });

  return (
    <section id="cobertura" className="py-20 bg-white text-slate-800 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
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

        {/* Region Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
              activeTab === 'all'
                ? 'bg-[#C87A32] text-white border-[#C87A32]'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:text-[#0B1E36]'
            }`}
          >
            Todas las Zonas
          </button>
          <button
            onClick={() => setActiveTab('norte')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
              activeTab === 'norte'
                ? 'bg-[#C87A32] text-white border-[#C87A32]'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:text-[#0B1E36]'
            }`}
          >
            Zona Norte
          </button>
          <button
            onClick={() => setActiveTab('centro')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
              activeTab === 'centro'
                ? 'bg-[#C87A32] text-white border-[#C87A32]'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:text-[#0B1E36]'
            }`}
          >
            Zona Centro
          </button>
          <button
            onClick={() => setActiveTab('sur')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
              activeTab === 'sur'
                ? 'bg-[#C87A32] text-white border-[#C87A32]'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:text-[#0B1E36]'
            }`}
          >
            Zona Sur
          </button>
          <button
            onClick={() => setActiveTab('internacional')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
              activeTab === 'internacional'
                ? 'bg-[#C87A32] text-white border-[#C87A32]'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:text-[#0B1E36]'
            }`}
          >
            Internacional
          </button>
        </div>

        {/* Regions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRegions.map((region, idx) => (
            <div
              key={idx}
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
                      Base Operativa Principal
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-extrabold text-[#0B1E36] font-sans">
                  {region.name}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {region.description}
                </p>

                {/* Hubs */}
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

                {/* Services */}
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
