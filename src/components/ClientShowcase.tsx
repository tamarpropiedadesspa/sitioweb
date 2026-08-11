import React, { useState, useEffect } from 'react';
import { Award, ChevronLeft, ChevronRight } from 'lucide-react';

interface ClientLogo {
  id: string;
  name: string;
  logo: string;
  url: string;
}

const CLIENT_LOGOS: ClientLogo[] = [
  { id: '1', name: 'Elecnor Chile', logo: '/logos/elecnor.png', url: 'https://www.elecnor.cl/' },
  { id: '2', name: 'Grupo TELCOH', logo: '/logos/telcoh.png', url: 'https://grupotelcoh.cl/' },
  { id: '3', name: 'Aramark', logo: '/logos/aramark.png', url: 'https://www.aramark.cl/home' },
  { id: '4', name: 'Piloansa', logo: '/logos/piloansa.png', url: 'https://piloansa.com/' },
  { id: '5', name: 'DataLux', logo: '/logos/datalux.png', url: 'https://datalux.cl/' },
  { id: '6', name: 'Cainsa SyM', logo: '/logos/cainsa.png', url: 'https://www.cainsasym.cl/' },
  { id: '7', name: 'Grupo GESCO', logo: '/logos/gesco.png', url: 'https://grupogesco.cl/' },
  { id: '8', name: 'Amarillas Emol', logo: '/logos/amarillas.png', url: 'https://amarillas.emol.com/home' },
  { id: '9', name: 'DHV Chile', logo: '/logos/dhv.png', url: 'https://dhvchile.cl/' },
  { id: '10', name: 'Wircom', logo: '/logos/wircom.png', url: 'https://www.wircom.cl/' },
];

export const ClientShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(CLIENT_LOGOS.length / itemsPerPage);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, 3500);
    return () => clearInterval(timer);
  }, [totalPages]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const visibleLogos = CLIENT_LOGOS.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  if (visibleLogos.length < itemsPerPage) {
    visibleLogos.push(...CLIENT_LOGOS.slice(0, itemsPerPage - visibleLogos.length));
  }

  return (
    <section id="clientes" className="py-16 bg-white text-slate-800 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#C87A32]/10 text-[#C87A32] border border-[#C87A32]/30 inline-flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            <span>Respaldo Institucional</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E36]">
            Empresas que confían en nuestra gestión
          </h2>
          <div className="w-16 h-1 bg-[#0B1E36] mx-auto rounded-full mt-3"></div>
        </div>

        {/* Carrusel - Contenedor ampliado */}
        <div className="relative max-w-6xl mx-auto px-10 sm:px-14">
          
          {/* Flecha Izquierda */}
          <button
            onClick={prevSlide}
            className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-10 p-2 text-slate-400 hover:text-[#0B1E36] transition-colors cursor-pointer"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Rejilla de Logos a TODO COLOR (Sin escala de grises) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 items-center justify-items-center min-h-[160px]">
            {visibleLogos.map((client, idx) => (
              <a
                key={`${client.id}-${idx}`}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center p-2 transition-all duration-300 transform hover:scale-110 group cursor-pointer"
                title={client.name}
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-20 sm:h-24 lg:h-28 w-full max-w-[220px] object-contain transition-all duration-300 drop-shadow-sm"
                />
              </a>
            ))}
          </div>

          {/* Flecha Derecha */}
          <button
            onClick={nextSlide}
            className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 z-10 p-2 text-slate-400 hover:text-[#0B1E36] transition-colors cursor-pointer"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Puntos de Navegación */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? 'bg-[#0B1E36] w-6'
                    : 'bg-slate-300 hover:bg-slate-400 w-2.5'
                }`}
                aria-label={`Ir a diapositiva ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
