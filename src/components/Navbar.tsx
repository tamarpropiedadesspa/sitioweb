import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, TrendingUp } from 'lucide-react';
import { PHONE_WHATSAPP, PHONE_DISPLAY } from '../data/mockData';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [ufValue, setUfValue] = useState<number>(37850);
  const [loadingUf, setLoadingUf] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const fetchUF = async () => {
      try {
        const res = await fetch('https://mindicador.cl/api/uf');
        if (res.ok) {
          const data = await res.json();
          if (data?.serie?.[0]?.valor && isMounted) {
            setUfValue(Math.round(data.serie[0].valor));
            setLoadingUf(false);
            return;
          }
        }
      } catch (e) {
        // Fallback fetch
      }

      try {
        const res2 = await fetch('https://cl.dolarapi.com/v1/uf');
        if (res2.ok) {
          const data2 = await res2.json();
          if (data2?.valor && isMounted) {
            setUfValue(Math.round(data2.valor));
            setLoadingUf(false);
            return;
          }
        }
      } catch (e2) {
        // Fallback default
      }

      if (isMounted) setLoadingUf(false);
    };

    fetchUF();
    return () => {
      isMounted = false;
    };
  }, []);

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'buscar', label: '¿Qué buscas?' },
    { id: 'propiedades', label: 'Propiedades' },
    { id: 'servicios', label: 'Servicios Empresas' },
    { id: 'cobertura', label: 'Cobertura' },
    { id: 'clientes', label: 'Clientes' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  const whatsappUrl = `https://wa.me/${PHONE_WHATSAPP.replace('+', '')}?text=${encodeURIComponent(
    'Hola Tamar Propiedades SpA, quisiera solicitar información sobre sus servicios inmobiliarios y corporativos.'
  )}`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      
      {/* Top Bar con UF e información de contacto */}
      <div className="bg-[#0B1E36] text-slate-300 border-b border-slate-800 text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 bg-[#C87A32]/20 text-[#C87A32] border border-[#C87A32]/40 px-2.5 py-0.5 rounded-full font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <TrendingUp className="w-3 h-3" />
              <span>
                {loadingUf ? 'UF Hoy: $37.850 CLP...' : `UF Hoy: $${ufValue.toLocaleString('es-CL')} CLP`}
              </span>
            </span>
            <span className="hidden md:inline text-[11px] text-slate-400 font-medium">
              • Indicador Financiero en Tiempo Real
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden sm:inline text-slate-300 font-medium">
              Cobertura: Iquique a Concepción & Latam
            </span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C87A32] font-bold hover:underline flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              <span>{PHONE_DISPLAY}</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Marca / Logo */}
          <div 
            onClick={() => handleNavClick('inicio')}
            className="flex items-center gap-2 sm:gap-3.5 cursor-pointer group max-w-[80%] sm:max-w-none"
          >
            <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200 overflow-hidden shrink-0">
              <img 
                src="/logo-icon.png" 
                alt="Tamar Icono" 
                className="w-full h-full object-contain"
              />
            </div>
            <img 
              src="/logo-text.png" 
              alt="Tamar Propiedades SpA" 
              className="h-8 sm:h-13 lg:h-14 w-auto object-contain group-hover:opacity-90 transition-opacity max-w-[170px] sm:max-w-none"
            />
          </div>

          {/* Menú Escritorio */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                  activeSection === item.id
                    ? 'text-[#C87A32] bg-[#C87A32]/10 border border-[#C87A32]/30 font-bold'
                    : 'text-slate-700 hover:text-[#C87A32] hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Menú Móvil */}
          <div className="xl:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:text-[#0B1E36] hover:bg-slate-100 focus:outline-none border border-slate-300 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Drawer Móvil */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-1">
            Navegación
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeSection === item.id
                  ? 'bg-[#C87A32] text-white font-semibold'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-[#0B1E36]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold text-sm bg-[#C87A32] hover:bg-[#A85D23] text-white shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span>Contactar por WhatsApp ({PHONE_DISPLAY})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
