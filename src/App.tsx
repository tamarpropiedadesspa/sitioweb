import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DualBlock } from './components/DualBlock';
import { PropertyCatalog } from './components/PropertyCatalog';
import { CorporateServices } from './components/CorporateServices';
import { RegionalCoverage } from './components/RegionalCoverage';
import { ClientShowcase } from './components/ClientShowcase';
import { MortgageCalculator } from './components/MortgageCalculator';
import { ContactFooter } from './components/ContactFooter';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Home, ArrowLeft } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [propertyFilterType, setPropertyFilterType] = useState('todas');
  const [propertyFilterCity, setPropertyFilterCity] = useState('todas');

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHeroQuickSearch = (type: string, location: string) => {
    setPropertyFilterType(type);
    setPropertyFilterCity(location);
    handleNavigate('propiedades');
  };

  const renderActiveView = () => {
    switch (activeSection) {
      case 'buscar':
        return (
          <DualBlock
            onSelectResidencial={() => handleNavigate('propiedades')}
            onSelectCorporativo={() => handleNavigate('servicios')}
          />
        );
      case 'propiedades':
        return (
          <PropertyCatalog
            initialTypeFilter={propertyFilterType}
            initialCityFilter={propertyFilterCity}
          />
        );
      case 'servicios':
        return <CorporateServices />;
      case 'cobertura':
        return <RegionalCoverage />;
      case 'clientes':
        return <ClientShowcase />;
      case 'calculadora':
        return <MortgageCalculator />;
      case 'contacto':
        return null; // ContactFooter will be rendered below automatically
      case 'inicio':
      default:
        return (
          <>
            <Hero
              onExploreProperties={() => handleNavigate('propiedades')}
              onExploreCorporate={() => handleNavigate('servicios')}
              onQuickSearch={handleHeroQuickSearch}
            />
            <DualBlock
              onSelectResidencial={() => handleNavigate('propiedades')}
              onSelectCorporativo={() => handleNavigate('servicios')}
            />
            <PropertyCatalog
              initialTypeFilter={propertyFilterType}
              initialCityFilter={propertyFilterCity}
            />
            <CorporateServices />
            <RegionalCoverage />
            <ClientShowcase />
            <MortgageCalculator />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans">
      {/* Sticky Top Navbar */}
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeSection !== 'inicio' && (
          <div className="bg-slate-900 border-b border-slate-800 text-white py-2.5 px-4 sm:px-8 shadow-inner">
            <div className="max-w-7xl mx-auto flex items-center justify-end">
              <button
                onClick={() => handleNavigate('inicio')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[#C87A32] font-bold border border-slate-700 transition-all text-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver a Inicio (Ver Todo)</span>
              </button>
            </div>
          </div>
        )}

        {renderActiveView()}

        {/* Contact Footer is included in all views */}
        <ContactFooter />
      </main>

      {/* Floating Action WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
}
