import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { PHONE_WHATSAPP, PHONE_DISPLAY } from '../data/mockData';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = `https://wa.me/${PHONE_WHATSAPP.replace('+', '')}?text=${encodeURIComponent('Hola Tamar Propiedades SpA, quisiera realizar una consulta directa.')}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl shadow-emerald-600/40 hover:scale-110 transition-transform duration-200 group relative"
      >
        <MessageCircle className="w-8 h-8 fill-white/20 stroke-[2.2]" />
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#C87A32] rounded-full border-2 border-white animate-pulse"></span>
      </a>
    </div>
  );
};
