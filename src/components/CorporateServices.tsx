import React, { useState } from 'react';
import { PHONE_WHATSAPP } from '../data/mockData';
import { Building2, Utensils, Compass, ArrowRight, CheckCircle2, X, Send } from 'lucide-react';

interface CorporateItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  idealFor: string;
  icon: React.ReactNode;
}

const corporateServicesList: CorporateItem[] = [
  {
    id: 'hospedaje',
    title: 'Hospedaje para Proyectos & Turnos',
    shortDesc: 'Arriendo de casas, departamentos y complejos habitacionales amoblados y acondicionados para el alojamiento de dotaciones corporativas.',
    fullDesc: 'Inmuebles residenciales estratégicamente ubicados con capacidad y equipamiento ideal para ingenieros, contratistas y personal de faena.',
    idealFor: 'Empresas contratistas, consultoras y equipos de operaciones.',
    icon: <Building2 className="w-7 h-7 text-white" />
  },
  {
    id: 'catering-espacios',
    title: 'Inmuebles para Catering & Comedores',
    shortDesc: 'Arriendo y habilitación de propiedades e instalaciones acondicionadas para la operación de cocinas industriales, comedores y servicios de alimentación.',
    fullDesc: 'Propiedades corporativas con la infraestructura espacial, sanitaria y eléctrica requerida por empresas de catering para atender personal en faena.',
    idealFor: 'Empresas de alimentación, servicios de casino e instalaciones temporales.',
    icon: <Utensils className="w-7 h-7 text-white" />
  },
  {
    id: 'terrenos-maquinaria',
    title: 'Terrenos Mineros, Energéticos & Patios',
    shortDesc: 'Búsqueda, corretaje y arriendo de grandes paños de tierra y terrenos para proyectos de energía, minería y acopio de maquinaria pesada.',
    fullDesc: 'Terrenos con factibilidad legal y técnica en el norte de Chile para proyectos fotovoltaicos, eólicos, acopio de equipos y base logística.',
    idealFor: 'Desarrolladores de energía renovable, mineras e industrias pesadas.',
    icon: <Compass className="w-7 h-7 text-white" />
  }
];

export const CorporateServices: React.FC = () => {
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string>('');
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    empresa: '',
    contacto: '',
    telefono: '',
    servicio: 'Hospedaje para Proyectos & Turnos',
    region: 'Tarapacá / Antofagasta',
    mensaje: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleOpenModal = (serviceTitle: string) => {
    setSelectedServiceTitle(serviceTitle);
    setFormData(prev => ({ ...prev, servicio: serviceTitle }));
    setModalOpen(true);
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const text = `Cotización Inmobiliaria Corporativa Tamar Propiedades SpA:\n- Empresa: ${formData.empresa}\n- Contacto: ${formData.contacto}\n- Teléfono: ${formData.telefono}\n- Servicio/Inmueble: ${formData.servicio}\n- Zona: ${formData.region}\n- Mensaje: ${formData.mensaje}`;
    const waUrl = `https://wa.me/${PHONE_WHATSAPP.replace('+', '')}?text=${encodeURIComponent(text)}`;
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1000);
  };

  return (
    <section id="servicios" className="py-20 bg-white text-slate-800 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de la sección */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#C87A32]/10 text-[#C87A32] border border-[#C87A32]/30">
            Soluciones Inmobiliarias B2B
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E36] font-sans">
            Empresas
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Gestión y arriendo de propiedades, terrenos e instalaciones acondicionadas para cubrir los requerimientos habitacionales y logísticos de tu compañía.
          </p>
        </div>

        {/* Rejilla de 3 tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {corporateServicesList.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#C87A32] transition-all shadow-md hover:shadow-xl relative group"
            >
              <div className="space-y-5">
                
                {/* Ícono de la tarjeta (sin badge B2B & Industrial) */}
                <div className="w-14 h-14 rounded-xl bg-[#C87A32] flex items-center justify-center text-white shadow-md shadow-[#C87A32]/20">
                  {service.icon}
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-[#0B1E36] mb-2 leading-snug font-sans">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                <p className="text-xs text-slate-500 border-l-2 border-[#C87A32] pl-3 py-1 font-medium italic">
                  {service.fullDesc}
                </p>

                {/* Audiencia objetivo */}
                <div className="pt-3 border-t border-slate-200 text-xs">
                  <span className="text-slate-500">Diseñado para: </span>
                  <span className="text-[#0B1E36] font-bold">{service.idealFor}</span>
                </div>

              </div>

              {/* Botón de Acción */}
              <div className="pt-6">
                <button
                  onClick={() => handleOpenModal(service.title)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#0B1E36] hover:bg-[#C87A32] text-white border border-[#0B1E36] hover:border-[#C87A32] transition-all shadow cursor-pointer"
                >
                  <span>Solicitar Propuesta</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Modal de Cotización Corporativa */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 space-y-6 relative shadow-2xl my-8">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold text-[#C87A32] uppercase tracking-wider">Tamar Propiedades SpA</span>
              <h3 className="text-2xl font-extrabold text-[#0B1E36]">Solicitud Inmobiliaria Corporativa</h3>
              <p className="text-xs text-slate-500 mt-1">Completa los datos de tu empresa para gestionar el inmueble o terreno que necesitas.</p>
            </div>

            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-300">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-[#0B1E36]">¡Solicitud Registrada!</h4>
                <p className="text-sm text-slate-600">
                  Redirigiendo a WhatsApp con el equipo de Tamar Propiedades SpA...
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-2 bg-slate-100 text-slate-800 text-xs rounded-lg font-bold cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Nombre de la Empresa / Razón Social *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Elecnor Chile, Aramark, Telcoh..."
                    value={formData.empresa}
                    onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-800 rounded-lg p-2.5 focus:outline-none focus:border-[#C87A32]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Nombre Contacto *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Juan Pérez"
                      value={formData.contacto}
                      onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 text-slate-800 rounded-lg p-2.5 focus:outline-none focus:border-[#C87A32]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Teléfono / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+569..."
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 text-slate-800 rounded-lg p-2.5 focus:outline-none focus:border-[#C87A32]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Requerimiento Inmobiliario</label>
                  <select
                    value={formData.servicio}
                    onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-800 rounded-lg p-2.5 focus:outline-none focus:border-[#C87A32]"
                  >
                    <option value="Hospedaje para Proyectos & Turnos">Hospedaje para Proyectos & Turnos</option>
                    <option value="Inmuebles para Catering & Comedores">Inmuebles para Catering & Comedores</option>
                    <option value="Terrenos Mineros, Energéticos & Patios">Terrenos Mineros, Energéticos & Patios</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Región / Ciudad de Interés</label>
                  <input
                    type="text"
                    placeholder="Ej. Pozo Almonte, Calama, Iquique..."
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-800 rounded-lg p-2.5 focus:outline-none focus:border-[#C87A32]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Detalles del Requerimiento</label>
                  <textarea
                    rows={3}
                    placeholder="Describa cantidad de trabajadores a alojar, superficie requerida para terrenos o equipamiento para cocinas..."
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-800 rounded-lg p-2.5 focus:outline-none focus:border-[#C87A32]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#C87A32] hover:bg-[#A85D23] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors text-sm uppercase cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Cotización por WhatsApp</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
