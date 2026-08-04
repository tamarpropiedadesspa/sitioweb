import React, { useState, useMemo } from 'react';
import { Calculator, DollarSign, TrendingUp, Percent, Info, ArrowRight, Phone } from 'lucide-react';
import { PHONE_WHATSAPP } from '../data/mockData';

export const MortgageCalculator: React.FC = () => {
  const [propertyPriceUF, setPropertyPriceUF] = useState<number>(3500);
  const [ufValueCLP, setUfValueCLP] = useState<number>(38000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [years, setYears] = useState<number>(20);
  const [annualInterest, setAnnualInterest] = useState<number>(4.8);

  // Calculations
  const calculations = useMemo(() => {
    const totalCLP = propertyPriceUF * ufValueCLP;
    const downPaymentUF = propertyPriceUF * (downPaymentPercent / 100);
    const downPaymentCLP = totalCLP * (downPaymentPercent / 100);
    
    const loanUF = propertyPriceUF - downPaymentUF;
    const loanCLP = totalCLP - downPaymentCLP;

    // Monthly interest rate
    const r = annualInterest / 100 / 12;
    const n = years * 12;

    let monthlyUF = 0;
    if (r > 0) {
      monthlyUF = (loanUF * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else {
      monthlyUF = loanUF / n;
    }

    const monthlyCLP = monthlyUF * ufValueCLP;

    return {
      totalCLP,
      downPaymentUF,
      downPaymentCLP,
      loanUF,
      loanCLP,
      monthlyUF,
      monthlyCLP,
    };
  }, [propertyPriceUF, ufValueCLP, downPaymentPercent, years, annualInterest]);

  const whatsappText = `Hola Tamar Propiedades SpA, utilicé su calculadora en línea para una propiedad de UF ${propertyPriceUF} ($${calculations.totalCLP.toLocaleString('es-CL')} CLP). Quisiera solicitar asesoría para evaluar opciones de compra.`;
  const whatsappUrl = `https://wa.me/${PHONE_WHATSAPP.replace('+', '')}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <section id="calculadora" className="py-20 bg-white text-slate-800 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#C87A32]/10 text-[#C87A32] border border-[#C87A32]/30">
            Herramienta Financiera Inmobiliaria
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E36] font-sans">
            Calculadora de Dividendo & Conversor UF / CLP
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Estima tu cuota mensual hipotecaria o valor de arriendo en UF y pesos chilenos según el plazo y la tasa de interés.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-md max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* UF Value Input */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Valor UF de Referencia ($ CLP)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-bold">$</span>
                  <input
                    type="number"
                    value={ufValueCLP}
                    onChange={(e) => setUfValueCLP(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-800 rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:border-[#C87A32]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Precio Propiedad (en UF)
                </label>
                <input
                  type="number"
                  step="50"
                  value={propertyPriceUF}
                  onChange={(e) => setPropertyPriceUF(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C87A32]"
                />
              </div>
            </div>

            {/* Slider 1: Down Payment Pie */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Pie Inicial (%):</span>
                <span className="text-[#C87A32] font-extrabold">{downPaymentPercent}% (UF {calculations.downPaymentUF.toLocaleString('es-CL', { maximumFractionDigits: 0 })})</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-[#C87A32] cursor-pointer"
              />
            </div>

            {/* Slider 2: Plazo Años */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Plazo del Crédito:</span>
                <span className="text-[#0B1E36] font-extrabold">{years} Años</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="5"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full accent-[#C87A32] cursor-pointer"
              />
            </div>

            {/* Slider 3: Interest Rate */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Tasa Anual Estimada (%):</span>
                <span className="text-[#0B1E36] font-extrabold">{annualInterest}%</span>
              </div>
              <input
                type="range"
                min="2.0"
                max="8.0"
                step="0.1"
                value={annualInterest}
                onChange={(e) => setAnnualInterest(Number(e.target.value))}
                className="w-full accent-[#C87A32] cursor-pointer"
              />
            </div>

          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#0B1E36] to-[#142C4D] border border-[#C87A32]/40 rounded-xl p-6 flex flex-col justify-between space-y-6 shadow-xl">
            <div className="space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#C87A32] block">
                Estimación de Dividendo Mensual
              </span>

              {/* Big Dividend Number */}
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-white">
                  UF {calculations.monthlyUF.toFixed(2)} <span className="text-xs font-medium text-slate-300">/ mes</span>
                </div>
                <div className="text-sm font-bold text-[#C87A32]">
                  ≈ ${calculations.monthlyCLP.toLocaleString('es-CL', { maximumFractionDigits: 0 })} CLP mensual
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-2 pt-4 border-t border-slate-700/80 text-xs text-slate-200">
                <div className="flex justify-between">
                  <span>Valor Propiedad:</span>
                  <span className="font-bold text-white">UF {propertyPriceUF.toLocaleString()} (${calculations.totalCLP.toLocaleString()} CLP)</span>
                </div>
                <div className="flex justify-between">
                  <span>Pie ({downPaymentPercent}%):</span>
                  <span className="font-bold text-emerald-400">UF {calculations.downPaymentUF.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monto a Financiar:</span>
                  <span className="font-bold text-white">UF {calculations.loanUF.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#C87A32] hover:bg-[#A85D23] text-white shadow-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Asesoría Hipotecaria por WhatsApp</span>
              </a>
              <p className="text-[10px] text-slate-300 text-center">
                *Valores referenciales. El dividendo definitivo depende de evaluaciones bancarias y seguros.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
