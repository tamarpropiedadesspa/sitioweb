import React, { useState, useEffect } from 'react';
import { Building2, Phone, Menu, X, ArrowRight, ShieldCheck, HardHat, TrendingUp } from 'lucide-react';
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
    { id: 'servicios', label: 'Empresas & Servicios' },
    { id: 'cobertura', label: 'Cobertura' },
    { id: 'clientes', label: 'Clientes' },
    { id: 'calculadora', label: 'Calculadora' },
    { id: 'contacto', label: 'Contacto' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  const whatsappUrl = `https://wa.me/${PHONE_WHATSAPP.replace('+', '')}?text=${encodeURIComponent('Hola Tamar Propiedades SpA, quisiera solicitar información sobre sus servicios inmobiliarios y corporativos.')}`;

  return (
    <header className="sticky top-0 z-50 bg-[#0B1E36]/95 backdrop-blur-md border-b border-slate-800 shadow-lg">
      
      {/* Top Bar with Real-time UF Indicator */}
      <div className="bg-[#050E1A] text-slate-300 border-b border-slate-800/80 text-xs py-1.5 px-4 sm:px-8">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Name using logo-icon.png */}
          <div 
            onClick={() => handleNavClick('inicio')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-white border border-[#C87A32]/30 p-1 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200 overflow-hidden">
              <img 
                src="/logo-header.png" 
                alt="Tamar Propiedades SpA" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5 font-sans">
                TAMAR <span className="text-[#C87A32] font-semibold">PROPIEDADES</span> <span className="text-xs bg-slate-800 text-slate-200 px-1.5 py-0.5 rounded border border-[#C87A32]/30 font-mono">SpA</span>
              </span>
              <span className="text-[11px] font-semibold text-slate-300 tracking-wider uppercase flex items-center gap-1">
                <HardHat className="w-3 h-3 text-[#C87A32]" /> Bienes Raíces & Ingeniería Sostenible
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                  activeSection === item.id
                    ? 'text-[#C87A32] bg-[#C87A32]/15 border border-[#C87A32]/40 font-bold'
                    : 'text-slate-200 hover:text-[#C87A32] hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* WhatsApp Direct CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider bg-[#C87A32] hover:bg-[#A85D23] text-white shadow-md shadow-[#C87A32]/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Phone className="w-4 h-4 fill-white/20" />
              <span>WhatsApp: {PHONE_DISPLAY}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#C87A32] hover:bg-[#A85D23] text-white font-medium text-xs flex items-center gap-1"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-200 hover:text-white hover:bg-slate-800 focus:outline-none border border-slate-700"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[#0B1E36] border-b border-slate-800 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-1">
            Navegación
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? 'bg-[#C87A32] text-white font-semibold'
                  : 'text-slate-200 hover:bg-slate-800 hover:text-white'
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
