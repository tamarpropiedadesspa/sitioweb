import React from 'react';
import { CLIENT_BRANDS } from '../data/mockData';
import { Building, ShieldCheck, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export const ClientShowcase: React.FC = () => {
  return (
    <section id="clientes" className="py-20 bg-white text-slate-800 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#C87A32]/10 text-[#C87A32] border border-[#C87A32]/30 inline-flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            <span>Respaldo Institucional</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E36] font-sans">
            Empresas que confían en nuestra gestión
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Hemos entregado soporte habitacional, territorial e industrial a compañías líderes en minería, infraestructura, energía y servicios.
          </p>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLIENT_BRANDS.map((client) => (
            <div
              key={client.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-[#C87A32]/60 transition-all shadow-md hover:shadow-xl group"
            >
              <div className="space-y-4">
                
                {/* Logo Badge */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-[#0B1E36] border border-[#C87A32]/30 flex items-center justify-center text-white font-black text-xs font-mono tracking-tighter">
                      {client.logoText.slice(0, 3)}
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-[#0B1E36] group-hover:text-[#C87A32] transition-colors">
                        {client.name}
                      </h3>
                      <span className="text-[11px] font-semibold text-slate-500 block">
                        {client.category}
                      </span>
                    </div>
                  </div>

                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                </div>

                {/* Scope */}
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {client.projectScope}
                </p>

              </div>

              {/* Footer Region */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>Operaciones:</span>
                <span className="font-bold text-[#C87A32] bg-[#C87A32]/10 px-2 py-0.5 rounded border border-[#C87A32]/20">
                  {client.region}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Trust Highlights */}
        <div className="mt-14 bg-gradient-to-r from-[#0B1E36] to-[#142C4D] border border-[#C87A32]/30 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center shadow-xl">
          <div className="space-y-1">
            <span className="text-3xl font-extrabold text-[#C87A32] font-sans">+100%</span>
            <p className="text-xs font-extrabold text-white uppercase tracking-wider">Cumplimiento Operativo</p>
            <p className="text-xs text-slate-300">En contratos habitacionales y habitabilidad</p>
          </div>
          <div className="space-y-1 border-y sm:border-y-0 sm:border-x border-slate-700 py-4 sm:py-0">
            <span className="text-3xl font-extrabold text-white font-sans">9+</span>
            <p className="text-xs font-extrabold text-white uppercase tracking-wider">Regiones de Cobertura</p>
            <p className="text-xs text-slate-300">Atención presencial y coordinada</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl font-extrabold text-[#C87A32] font-sans">24/7</span>
            <p className="text-xs font-extrabold text-white uppercase tracking-wider">Respuesta a Faenas</p>
            <p className="text-xs text-slate-300">Contacto directo vía WhatsApp corporativo</p>
          </div>
        </div>

      </div>
    </section>
  );
};
