import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { PHONE_WHATSAPP, PHONE_DISPLAY, EMAIL_CONTACT } from '../data/mockData';

export const ContactFooter: React.FC = () => {
  const whatsappUrl = `https://wa.me/${PHONE_WHATSAPP.replace('+', '')}?text=${encodeURIComponent(
    'Hola Tamar Propiedades SpA, quisiera solicitar información sobre sus servicios inmobiliarios y corporativos.'
  )}`;

  return (
    <footer id="contacto" className="bg-[#0B1E36] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Layout Principal de 2 Columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12">
          
          {/* Columna Izquierda: Logo Completo Grande */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-700 w-full max-w-md text-center transform hover:scale-[1.02] transition-transform duration-300">
              <img
                src="/logo-footer.jpg"
                alt="Tamar Propiedades SpA - Logo Completo"
                className="w-full h-auto max-h-[380px] object-contain mx-auto"
              />
            </div>
          </div>

          {/* Columna Derecha: Información de Contacto y Cobertura */}
          <div className="lg:col-span-7 space-y-6">
            
            <div>
              <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#C87A32]/20 text-[#C87A32] border border-[#C87A32]/40 inline-block mb-3">
                Contacto Directo & Atención Corporativa
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
                Tamar Propiedades SpA
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-2">
                Empresa chilena especializada en la comercialización inmobiliaria residencial y la provisión de soporte logístico, habitacional y técnico para grandes proyectos industriales y mineros.
              </p>
            </div>

            {/* Tarjetas de Información */}
            <div className="space-y-4 pt-2">
              
              {/* Teléfono / WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/60 border border-slate-700 hover:border-[#C87A32]/60 hover:bg-slate-800 transition-all group"
              >
                <div className="p-3 rounded-lg bg-[#C87A32]/20 text-[#C87A32] group-hover:bg-[#C87A32] group-hover:text-white transition-colors shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-semibold text-slate-400 block">Teléfono & WhatsApp Directo</span>
                  <span className="text-base font-extrabold text-white flex items-center gap-1 group-hover:text-[#C87A32] transition-colors">
                    {PHONE_DISPLAY} <ArrowUpRight className="w-4 h-4 opacity-70" />
                  </span>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${EMAIL_CONTACT}`}
                className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/60 border border-slate-700 hover:border-[#C87A32]/60 hover:bg-slate-800 transition-all group"
              >
                <div className="p-3 rounded-lg bg-[#C87A32]/20 text-[#C87A32] group-hover:bg-[#C87A32] group-hover:text-white transition-colors shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-semibold text-slate-400 block">Correo Electrónico Corporativo</span>
                  <span className="text-base font-extrabold text-white group-hover:text-[#C87A32] transition-colors">
                    {EMAIL_CONTACT}
                  </span>
                </div>
              </a>

              {/* Cobertura */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/60 border border-slate-700">
                <div className="p-3 rounded-lg bg-[#C87A32]/20 text-[#C87A32] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">Cobertura de Operaciones</span>
                  <span className="text-sm font-bold text-slate-200">
                    Chile (Iquique, Pozo Almonte, Calama, Antofagasta, La Serena, Ovalle, Viña del Mar, Concepción) | Bolivia & Perú
                  </span>
                </div>
              </div>

            </div>

            {/* Banner de Garantía */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-transparent border border-[#C87A32]/30 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#C87A32] shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Atención Profesional & Confidencial</h4>
                <p className="text-xs text-slate-300">Respuesta rápida y directa para requerimientos de particulares y empresas.</p>
              </div>
            </div>

          </div>

        </div>

        {/* Separador e Información de Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Tamar Propiedades SpA. Todos los derechos reservados.</p>
          <p className="text-slate-400">
            Tamar Propiedades SpA <span className="text-[#C87A32] font-bold">• Bienes Raíces & Ingeniería Sostenible</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
