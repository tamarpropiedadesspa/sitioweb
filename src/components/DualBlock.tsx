import React from 'react';
import { Home, Building2, Utensils, Truck, Compass, CheckCircle, ArrowRight, ShieldCheck, BedDouble } from 'lucide-react';
import { PHONE_WHATSAPP } from '../data/mockData';

interface DualBlockProps {
  onSelectResidencial: () => void;
  onSelectCorporativo: () => void;
}

export const DualBlock: React.FC<DualBlockProps> = ({
  onSelectResidencial,
  onSelectCorporativo,
}) => {
  const whatsappResidencial = `https://wa.me/${PHONE_WHATSAPP.replace('+', '')}?text=${encodeURIComponent('Hola Tamar Propiedades SpA, busco asesoría para comprar/arrendar una propiedad residencial.')}`;
  const whatsappCorporativo = `https://wa.me/${PHONE_WHATSAPP.replace('+', '')}?text=${encodeURIComponent('Hola Tamar Propiedades SpA, necesito cotizar servicios corporativos e industriales (hospedaje, catering, terrenos o maquinaria).')}`;

  return (
    <section id="buscar" className="py-16 sm:py-24 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#C87A32]/10 text-[#C87A32] border border-[#C87A32]/30">
            Doble Solución Integrada
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E36] font-sans">
            ¿Qué estás buscando hoy?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Acompañamos a familias e inversionistas con gestión inmobiliaria cercana y a grandes empresas con logística técnica de alto nivel.
          </p>
        </div>

        {/* Dual Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Residencial */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#C87A32]/60 transition-all shadow-md hover:shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C87A32]/5 rounded-bl-full pointer-events-none"></div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#C87A32] to-[#A85D23] flex items-center justify-center text-white shadow-md shadow-[#C87A32]/20">
                  <Home className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                  Sector Residencial
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-[#0B1E36] mb-2">
                  Casas, Departamentos & Parcelas
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Encuentra el hogar ideal para tu familia o una inversión inmobiliaria segura con el acompañamiento de expertos locales.
                </p>
              </div>

              {/* Service Bullet Points */}
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-[#C87A32] shrink-0 mt-0.5" />
                  <span><strong>Compra y Venta:</strong> Casas en La Serena, Concepción, Ovalle e Iquique.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-[#C87A32] shrink-0 mt-0.5" />
                  <span><strong>Arriendos de Larga Duración:</strong> Departamentos amoblados y no amoblados.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-[#C87A32] shrink-0 mt-0.5" />
                  <span><strong>Parcelas de Agrado:</strong> Paños planos con derechos de agua y factibilidad solar.</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="pt-8 space-y-3">
              <button
                onClick={onSelectResidencial}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-[#C87A32] hover:bg-[#A85D23] text-white shadow-md transition-all"
              >
                <span>Explorar Propiedades Residenciales</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <a
                href={whatsappResidencial}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-slate-700 hover:text-[#0B1E36] bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors"
              >
                <span>Cotizar Residencial por WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Card 2: Corporativo e Industrial */}
          <div className="bg-white border-2 border-[#C87A32]/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#C87A32] transition-all shadow-md hover:shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C87A32]/10 rounded-bl-full pointer-events-none"></div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-xl bg-[#0B1E36] flex items-center justify-center text-[#C87A32] shadow-md">
                  <Building2 className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C87A32] bg-[#C87A32]/10 px-3 py-1 rounded-full border border-[#C87A32]/30">
                  Corporativo & Industrial
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-[#0B1E36] mb-2">
                  Soporte Técnico & Terrenos para Empresas
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Soporte logístico de alta exigencia para proyectos mineros, fotovoltaicos, viales y de montaje en todo Chile.
                </p>
              </div>

              {/* Service Bullet Points */}
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <BedDouble className="w-5 h-5 text-[#C87A32] shrink-0 mt-0.5" />
                  <span><strong>Hospedaje por Proyectos:</strong> Alojamiento modulado y casas de faena por turnos.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Utensils className="w-5 h-5 text-[#C87A32] shrink-0 mt-0.5" />
                  <span><strong>Catering Industrial:</strong> Servicio de alimentación equilibrada para personal técnico.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Truck className="w-5 h-5 text-[#C87A32] shrink-0 mt-0.5" />
                  <span><strong>Arriendo de Maquinaria:</strong> Flota y generadores con soporte en sitio 24/7.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Compass className="w-5 h-5 text-[#C87A32] shrink-0 mt-0.5" />
                  <span><strong>Terrenos Mineros/Energéticos:</strong> Paños industriales en Pozo Almonte y Calama.</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="pt-8 space-y-3">
              <button
                onClick={onSelectCorporativo}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#C87A32] to-[#A85D23] hover:from-[#A85D23] hover:to-[#8C4B19] text-white shadow-lg shadow-[#C87A32]/20 transition-all"
              >
                <span>Ver Servicios para Empresas</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={whatsappCorporativo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-[#0B1E36] hover:text-white bg-slate-100 hover:bg-[#C87A32] border border-slate-300 transition-colors"
              >
                <span>Cotización Corporativa Directa WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
