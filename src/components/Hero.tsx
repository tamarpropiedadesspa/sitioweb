import React from 'react';
import { Home, Building, ArrowRight, ShieldCheck } from 'lucide-react';
import { PHONE_WHATSAPP } from '../data/mockData';

interface HeroProps {
  onExploreProperties: () => void;
  onExploreCorporate: () => void;
  onQuickSearch?: (type: string, location: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreProperties,
  onExploreCorporate,
}) => {
  const whatsappDirect = `https://wa.me/${PHONE_WHATSAPP.replace('+', '')}?text=${encodeURIComponent(
    'Hola Tamar Propiedades SpA, vi su sitio web y desearía realizar una consulta sobre sus propiedades y servicios.'
  )}`;

  return (
    <section id="inicio" className="relative bg-white text-slate-800 pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden border-b border-slate-200">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 rounded-full bg-[#C87A32]/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 rounded-full bg-slate-100 blur-2xl pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#C87A32_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Columna de texto principal */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Titular Principal H1 */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0B1E36] leading-tight font-sans">
              Soluciones inmobiliarias y corporativas: <span className="text-[#C87A32]">Desde el hogar para tu familia hasta el soporte para empresas</span>.
            </h1>

            {/* Subtítulo */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Presencia y experiencia en las regiones de Antofagasta y Coquimbo.
            </p>

            {/* Botones de Acción Doble */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreProperties}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-bold text-base text-white bg-[#C87A32] hover:bg-[#A85D23] shadow-lg shadow-[#C87A32]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Home className="w-5 h-5" />
                <span>Ver propiedades</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreCorporate}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-bold text-base text-[#0B1E36] bg-slate-100 hover:bg-slate-200 border border-slate-300 shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Building className="w-5 h-5 text-[#C87A32]" />
                <span>Servicios para Empresas</span>
              </button>
            </div>

          </div>

          {/* Tarjeta de Imagen Visual */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl p-2">
              <div className="relative h-[340px] sm:h-[400px] rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                  alt="Tamar Propiedades SpA Inmobiliaria e Ingeniería"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E36]/90 via-[#0B1E36]/30 to-transparent"></div>

                {/* Badge flotante sobre la imagen */}
                <div className="absolute top-4 left-4 bg-[#0B1E36]/90 backdrop-blur-md px-3.5 py-2 rounded-lg border border-slate-700 flex items-center gap-2 shadow-lg">
                  <ShieldCheck className="w-5 h-5 text-[#C87A32]" />
                  <div className="text-left">
                    <p className="text-xs font-extrabold text-white">Gestión de Calidad Integral</p>
                    <p className="text-[10px] font-medium text-slate-300">Residencial & Corporativo</p>
                  </div>
                </div>

                {/* Overlay inferior de información */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0B1E36]/90 backdrop-blur-md border border-slate-700 text-left space-y-2 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C87A32] uppercase tracking-wider">Atención Especializada</span>
                    <span className="text-[10px] bg-[#C87A32]/20 text-[#C87A32] px-2 py-0.5 rounded border border-[#C87A32]/40 font-bold">Antofagasta & Coquimbo</span>
                  </div>
                  <p className="text-sm font-bold text-white">
                    Corretaje de propiedades, hospedaje de personal y terrenos para empresas.
                  </p>
                  <a
                    href={whatsappDirect}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#C87A32] hover:text-amber-400 font-extrabold"
                  >
                    <span>Cotizar directamente por WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
