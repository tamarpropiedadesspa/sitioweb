import React, { useState } from 'react';
import { PHONE_WHATSAPP, PHONE_DISPLAY, EMAIL_CONTACT } from '../data/mockData';
import { Phone, Mail, MapPin, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ContactFooter: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipoServicio: 'Corretaje Residencial',
    ciudad: 'La Serena / Coquimbo',
    mensaje: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const text = `Consulta Web Tamar Propiedades SpA:\n- Nombre: ${formData.nombre}\n- Email: ${formData.email}\n- Teléfono: ${formData.telefono}\n- Servicio: ${formData.tipoServicio}\n- Ciudad: ${formData.ciudad}\n- Mensaje: ${formData.mensaje}`;
    const waUrl = `https://wa.me/${PHONE_WHATSAPP.replace('+', '')}?text=${encodeURIComponent(text)}`;
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 800);
  };

  return (
    <footer id="contacto" className="bg-[#0B1E36] text-white pt-20 pb-12 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid Principal de 12 Columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          
          {/* Columna Izquierda: Información Corporativa (5 Columnas) */}
          <div className="lg:col-span-5 flex flex-col space-y-6 w-full">
            
            {/* Logo */}
            <div>
              <div className="bg-white p-3 rounded-2xl border border-slate-700/50 shadow-md inline-block">
                <img 
                  src="/logo-footer.png" 
                  alt="Tamar Propiedades SpA" 
                  className="h-20 w-auto object-contain rounded-lg"
                />
              </div>
            </div>

            {/* Texto Descriptivo */}
            <p className="text-slate-300 text-sm leading-relaxed">
              Empresa chilena especializada en la comercialización inmobiliaria residencial y la provisión de soporte logístico, habitacional y técnico para grandes proyectos industriales y mineros.
            </p>

            {/* Datos de Contacto Directo */}
            <div className="space-y-4 text-sm text-slate-200 pt-2 w-full">
              <div className="flex items-start gap-3 w-full">
                <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-[#C87A32] shrink-0 border border-slate-700">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs text-slate-400 block">Teléfono & WhatsApp Directo</span>
                  <a href={`tel:${PHONE_WHATSAPP}`} className="font-bold text-white hover:text-[#C87A32] transition-colors break-words">
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 w-full">
                <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-[#C87A32] shrink-0 border border-slate-700">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs text-slate-400 block">Correo Electrónico Corporativo</span>
                  <a href={`mailto:${EMAIL_CONTACT}`} className="font-bold text-white hover:text-[#C87A32] transition-colors break-all">
                    {EMAIL_CONTACT}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 w-full">
                <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-[#C87A32] shrink-0 border border-slate-700">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs text-slate-400 block">Cobertura de Operaciones</span>
                  <span className="font-semibold text-slate-200 leading-snug block">
                    Chile (Iquique, Pozo Almonte, Calama, Antofagasta, La Serena, Ovalle, Viña del Mar, Concepción) | Bolivia & Perú
                  </span>
                </div>
              </div>
            </div>

            {/* Sello de Garantía */}
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center gap-3 w-full">
              <ShieldCheck className="w-8 h-8 text-[#C87A32] shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-white">Atención Profesional & Confidencial</p>
                <p className="text-slate-400">Atención personalizada con estándar de respuesta directa.</p>
              </div>
            </div>

          </div>

          {/* Columna Derecha: Formulario (7 Columnas) */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl w-full">
            <div className="space-y-2 mb-6">
              <h3 className="text-2xl font-bold text-white">Formulario de Cotización Rápida</h3>
              <p className="text-xs text-slate-400">Envía tus datos para recibir asesoría inmobiliaria o corporativa instantánea.</p>
            </div>

            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-xl font-bold text-white">¡Gracias por contactarnos!</h4>
                <p className="text-sm text-slate-300">
                  Hemos generado tu solicitud y abierto WhatsApp para conectar con un ejecutivo de Tamar Propiedades SpA (+56974747910).
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-slate-800 text-slate-200 text-xs font-bold rounded-lg"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre y apellido"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 focus:outline-none focus:border-[#C87A32]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Teléfono / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+56 9 7474 7910"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 focus:outline-none focus:border-[#C87A32]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Correo Electrónico</label>
                    <input
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 focus:outline-none focus:border-[#C87A32]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Tipo de Servicio</label>
                    <select
                      value={formData.tipoServicio}
                      onChange={(e) => setFormData({ ...formData, tipoServicio: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 focus:outline-none focus:border-[#C87A32]"
                    >
                      <option value="Corretaje Residencial">Comprar / Arrendar Casa o Depto</option>
                      <option value="Venta Parcela">Parcelas de Agrado / Terrenos</option>
                      <option value="Hospedaje Faenas">Hospedaje por Proyectos Corporativos</option>
                      <option value="Catering & Maquinaria">Catering Industrial / Maquinaria</option>
                      <option value=" Terrenos Mineros">Terrenos Mineros & Energéticos</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Ciudad / Región de Interés</label>
                  <input
                    type="text"
                    placeholder="Ej. La Serena, Calama, Iquique, Concepción..."
                    value={formData.ciudad}
                    onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 focus:outline-none focus:border-[#C87A32]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Mensaje o Detalle</label>
                  <textarea
                    rows={3}
                    placeholder="Escribe brevemente tu requerimiento..."
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 focus:outline-none focus:border-[#C87A32]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#C87A32] hover:bg-[#A85D23] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors text-sm uppercase tracking-wider"
                >
                  <Send className="w-4 h-4" />
                  <span>Cotizar Vía WhatsApp (+56974747910)</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Footer Bottom Line & Copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Tamar Propiedades SpA. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Tamar Propiedades SpA</span>
            <span className="text-[#C87A32] font-bold">• Bienes Raíces & Ingeniería Sostenible</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
