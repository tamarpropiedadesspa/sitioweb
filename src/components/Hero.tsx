import React from 'react';
import { Home, Building, ArrowRight, MapPin, ShieldCheck, CheckCircle2, ChevronDown, Compass, Sparkles } from 'lucide-react';
import { PHONE_WHATSAPP } from '../data/mockData';

interface HeroProps {
  onExploreProperties: () => void;
  onExploreCorporate: () => void;
  onQuickSearch: (type: string, location: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreProperties,
  onExploreCorporate,
  onQuickSearch,
}) => {
  const [selectedType, setSelectedType] = React.useState('todas');
  const [selectedCity, setSelectedCity] = React.useState('todas');

  const handleSearchClick = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickSearch(selectedType, selectedCity);
  };

  const whatsappDirect = `https://wa.me/${PHONE_WHATSAPP.replace('+', '')}?text=${encodeURIComponent('Hola Tamar Propiedades SpA, vi su sitio web y desearía realizar una consulta sobre sus propiedades y servicios.')}`;

  return (
    <section id="inicio" className="relative bg-white text-slate-800 pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden border-b border-slate-200">
      {/* Background Decorator Elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 rounded-full bg-[#C87A32]/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 rounded-full bg-slate-100 blur-2xl pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#C87A32_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tag Badges */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-[#C87A32]/40 text-[#C87A32] text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#C87A32]" />
              <span>Bienes Raíces & Ingeniería Sostenible en Chile</span>
            </div>

            {/* Main H1 Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0B1E36] leading-tight font-sans">
              Soluciones inmobiliarias y corporativas: <span className="text-[#C87A32]">desde el hogar para tu familia hasta el soporte industrial para empresas</span> en todo Chile.
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Presencia y experiencia comprobada de Iquique a Concepción.
            </p>

            {/* Dual CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              {/* Button 1: Residenciales (Cobre Metallic) */}
              <button
                onClick={onExploreProperties}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-bold text-base text-white bg-[#C87A32] hover:bg-[#A85D23] shadow-lg shadow-[#C87A32]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Home className="w-5 h-5" />
                <span>Ver Propiedades Residenciales</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Button 2: Servicios para Empresas */}
              <button
                onClick={onExploreCorporate}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-bold text-base text-[#0B1E36] bg-slate-100 hover:bg-slate-200 border border-slate-300 shadow-sm transition-all transform hover:-translate-y-0.5"
              >
                <Building className="w-5 h-5 text-[#C87A32]" />
                <span>Servicios para Empresas</span>
              </button>
            </div>

            {/* Key Trust Highlights */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C87A32] shrink-0" />
                <span>Cobertura Iquique - Concepción</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C87A32] shrink-0" />
                <span>Operaciones Bolivia & Perú</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-[#C87A32] shrink-0" />
                <span>Respuesta Directa WhatsApp</span>
              </div>
            </div>

          </div>

          {/* Hero Image Card Visual */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl p-2">
              <div className="relative h-[340px] sm:h-[400px] rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1000&q=80"
                  alt="Tamar Propiedades SpA Inmobiliaria e Ingeniería"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E36]/90 via-[#0B1E36]/30 to-transparent"></div>

                {/* Floating Badge on Image */}
                <div className="absolute top-4 left-4 bg-[#0B1E36]/90 backdrop-blur-md px-3.5 py-2 rounded-lg border border-slate-700 flex items-center gap-2 shadow-lg">
                  <ShieldCheck className="w-5 h-5 text-[#C87A32]" />
                  <div className="text-left">
                    <p className="text-xs font-extrabold text-white">Gestión de Calidad Integral</p>
                    <p className="text-[10px] font-medium text-slate-300">Residencial, Minería & Energía</p>
                  </div>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0B1E36]/90 backdrop-blur-md border border-slate-700 text-left space-y-2 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C87A32] uppercase tracking-wider">Atención Multizona</span>
                    <span className="text-[10px] bg-[#C87A32]/20 text-[#C87A32] px-2 py-0.5 rounded border border-[#C87A32]/40 font-bold">Chile - Latam</span>
                  </div>
                  <p className="text-sm font-bold text-white">
                    Corretaje corporativo, hospedaje de faena y gestión de terrenos estratégicos.
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

        {/* Floating Quick Filter Panel */}
        <div className="mt-12 bg-[#F8FAFC] p-4 sm:p-6 rounded-2xl border border-[#E2E8F0] shadow-xl max-w-5xl mx-auto">
          <form onSubmit={handleSearchClick} className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-7 gap-3 items-end">
            
            <div className="lg:col-span-2 space-y-1">
              <label className="text-xs font-bold text-[#0B1E36] uppercase tracking-wider block text-left">
                Tipo de Propiedad / Servicio
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-[#0B1E36] font-semibold focus:outline-none focus:border-[#C87A32] focus:ring-1 focus:ring-[#C87A32]"
              >
                <option value="todas">Todos los servicios</option>
                <option value="residencial">Casas Residenciales</option>
                <option value="departamento">Departamentos Ejecutivos</option>
                <option value="terreno">Terrenos / Parcelas</option>
                <option value="industrial">Infraestructura & Terrenos Mineros</option>
              </select>
            </div>

            <div className="lg:col-span-2 space-y-1">
              <label className="text-xs font-bold text-[#0B1E36] uppercase tracking-wider block text-left">
                Ubicación / Ciudad
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-[#0B1E36] font-semibold focus:outline-none focus:border-[#C87A32] focus:ring-1 focus:ring-[#C87A32]"
              >
                <option value="todas">Todas las regiones</option>
                <option value="Iquique">Iquique / Pozo Almonte</option>
                <option value="Calama">Calama / Antofagasta</option>
                <option value="La Serena">La Serena / Ovalle</option>
                <option value="Viña del Mar">Viña del Mar</option>
                <option value="Concepción">Concepción</option>
              </select>
            </div>

            <div className="lg:col-span-3">
              <button
                type="submit"
                className="w-full bg-[#C87A32] hover:bg-[#A85D23] text-white font-bold py-2.5 px-4 rounded-lg text-sm flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Compass className="w-4 h-4" />
                <span>Buscar en Catálogo Dinámico</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};
