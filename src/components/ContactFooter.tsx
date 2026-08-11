import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, ArrowUpRight, ChevronRight } from 'lucide-react';
import { PHONE_WHATSAPP, PHONE_DISPLAY, EMAIL_CONTACT } from '../data/mockData';

interface ContactFooterProps {
  onNavigate?: (sectionId: string) => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ onNavigate }) => {
  const whatsappUrl = `https://wa.me/${PHONE_WHATSAPP.replace('+', '')}?text=${encodeURIComponent(
    'Hola Tamar Propiedades SpA, quisiera solicitar información sobre sus servicios inmobiliarios y corporativos.'
  )}`;

  const navLinks = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'buscar', label: '¿Qué buscas?' },
    { id: 'propiedades', label: 'Propiedades' },
    { id: 'servicios', label: 'Servicios Empresas' },
    { id: 'cobertura', label: 'Cobertura' },
    { id: 'clientes', label: 'Nuestros Clientes' },
  ];

  return (
    <footer id="contacto" className="bg-[#0B1E36] text-white pt-16 pb-12 border-t border-slate-800 relative overflow-hidden">
      {/* Resplandor sutil de fondo */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C87A32]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Layout Principal de 3 Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Columna 1: Branding e Identidad */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="flex items-center gap-3.5">
              <div className="h-14 w-14 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-lg shrink-0 border border-slate-200">
                <img
                  src="/logo-icon.png"
                  alt="Tamar Icono"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white tracking-wide font-sans">
                  TAMAR PROPIEDADES <span className="text-[#C87A32]">SpA</span>
                </h3>
                <p className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">
                  Bienes Raíces & Ingeniería Sostenible
                </p>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed max-w-md">
              Especialistas en comercialización inmobiliaria residencial y soluciones de habitabilidad, hospedaje de personal, catering y gestión de terrenos estratégicos en Antofagasta y Ovalle.
            </p>

            {/* Badge de confianza sin B2B */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#C87A32] shrink-0" />
              <span>Gestión Profesional & Atención Confidencial para Empresas</span>
            </div>
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-[#C87A32] uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate && onNavigate(link.id)}
                    className="text-slate-300 hover:text-[#C87A32] transition-colors flex items-center gap-1.5 group text-left cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#C87A32] opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Canales de Contacto Directo */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-[#C87A32] uppercase tracking-wider">
              Contacto Directo
            </h4>

            <div className="space-y-3">
              {/* WhatsApp Card */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700 hover:border-[#C87A32] hover:bg-slate-800 transition-all group cursor-pointer"
              >
                <div className="p-2.5 rounded-xl bg-[#C87A32]/20 text-[#C87A32] group-hover:bg-[#C87A32] group-hover:text-white transition-colors shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Teléfono & WhatsApp</span>
                  <span className="text-sm font-bold text-white group-hover:text-[#C87A32] transition-colors flex items-center gap-1">
                    {PHONE_DISPLAY} <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                  </span>
                </div>
              </a>

              {/* Email Card */}
              <a
                href={`mailto:${EMAIL_CONTACT}`}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700 hover:border-[#C87A32] hover:bg-slate-800 transition-all group cursor-pointer"
              >
                <div className="p-2.5 rounded-xl bg-[#C87A32]/20 text-[#C87A32] group-hover:bg-[#C87A32] group-hover:text-white transition-colors shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Correo Corporativo</span>
                  <span className="text-sm font-bold text-white group-hover:text-[#C87A32] transition-colors truncate block">
                    {EMAIL_CONTACT}
                  </span>
                </div>
              </a>

              {/* Cobertura */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700">
                <div className="p-2.5 rounded-xl bg-[#C87A32]/20 text-[#C87A32] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Cobertura Directa</span>
                  <span className="text-xs font-semibold text-slate-200">
                    Región de Antofagasta & Región de Coquimbo
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Sub-footer Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Tamar Propiedades SpA. Todos los derechos reservados.</p>
          <p className="text-slate-400">
            Tamar Propiedades SpA <span className="text-[#C87A32] font-bold">• Bienes Raíces & Ingeniería Sostenible</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
