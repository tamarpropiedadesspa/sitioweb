import React, { useState } from 'react';
import { CORPORATE_SERVICES, PHONE_WHATSAPP } from '../data/mockData';
import { CorporateService } from '../types';
import { Building2, Utensils, Truck, Compass, ArrowRight, ShieldCheck, CheckCircle2, X, Send } from 'lucide-react';

export const CorporateServices: React.FC = () => {
  const [selectedService, setSelectedService] = useState<CorporateService | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    empresa: '',
    contacto: '',
    telefono: '',
    servicio: 'Hospedaje por Proyectos & Turnos',
    region: 'Tarapacá / Antofagasta',
    mensaje: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // Filtrar para mostrar únicamente las 3 tarjetas restantes
  const displayedServices = CORPORATE_SERVICES.filter(
    (s) => !s.title.toLowerCase().includes('maquinaria')
  );

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-7 h-7" />;
      case 'Utensils': return <Utensils className="w-7 h-7" />;
      case 'Truck': return <Truck className="w-7 h-7" />;
      case 'Compass': return <Compass className="w-7 h-7" />;
      default: return <ShieldCheck className="w-7 h-7" />;
    }
  };

  const handleOpenModal = (service?: CorporateService) => {
    if (service) {
      setSelectedService(service);
      setFormData(prev => ({ ...prev, servicio: service.title }));
    }
    setModalOpen(true);
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const text = `Cotización Corporativa Tamar Propiedades SpA:\n- Empresa: ${formData.empresa}\n- Contacto: ${formData.contacto}\n- Teléfono: ${formData.telefono}\n- Servicio: ${formData.servicio}\n- Zona: ${formData.region}\n- Mensaje: ${formData.mensaje}`;
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
            Ingeniería & Soporte Operativo
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E36] font-sans">
            Empresas
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Soluciones continuas y adaptadas para compañías de minería, energía, construcción e infraestructura en todo el territorio chileno.
          </p>
        </div>

        {/* Rejilla de 3 tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {displayedServices.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#C87A32] transition-all shadow-md hover:shadow-xl relative group"
            >
              <div className="space-y-5">
                
                {/* Ícono y Badge */}
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-xl bg-[#C87A32] flex items-center justify-center text-white shadow-md shadow-[#C87A32]/20">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C87A32] bg-[#C87A32]/10 px-2.5 py-1 rounded border border-[#C87A32]/30">
                    B2B & Industrial
                  </span>
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
                  onClick={() => handleOpenModal(service)}
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
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold text-[#C87A32] uppercase tracking-wider">Tamar Propiedades SpA</span>
              <h3 className="text-2xl font-extrabold text-[#0B1E36]">Solicitud Corporativa B2B</h3>
              <p className="text-xs text-slate-500 mt-1">Completa los datos de tu empresa para una respuesta inmediata en menos de 24 horas.</p>
            </div>

            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-300">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-[#0B1E36]">¡Solicitud Registrada!</h4>
                <p className="text-sm text-slate-600">
                  Redirigiendo a WhatsApp con el equipo de Tamar Propiedades SpA para atención prioritaria...
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-2 bg-slate-100 text-slate-800 text-xs rounded-lg font-bold"
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
                  <label className="block text-slate-700 font-bold mb-1">Servicio de Interés</label>
                  <select
                    value={formData.servicio}
                    onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-800 rounded-lg p-2.5 focus:outline-none focus:border-[#C87A32]"
                  >
                    <option value="Hospedaje por Proyectos & Turnos">Hospedaje por Proyectos & Turnos</option>
                    <option value="Catering Industrial & Alimentación">Catering Industrial & Alimentación</option>
                    <option value="Terrenos Mineros & Energéticos">Terrenos Mineros & Energéticos</option>
                    <option value="Paquete Logístico Integral">Paquete Logístico Integral</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Región / Ciudad de Operación</label>
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
                    placeholder="Describa cantidad de trabajadores, duración del proyecto o especificaciones de terrenos..."
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
