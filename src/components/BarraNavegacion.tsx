import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const BarraNavegacion = () => {
  const { i18n } = useTranslation();
  const [esOscuro, setEsOscuro] = useState(() => {
    if (typeof window !== 'undefined') {
      const guardado = localStorage.getItem('tema');
      if (guardado) {
        return guardado === 'dark';
      }
      return document.documentElement.classList.contains('dark') || 
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (esOscuro) {
      root.classList.add('dark');
      localStorage.setItem('tema', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('tema', 'light');
    }
  }, [esOscuro]);

  const toggleTema = () => {
    setEsOscuro(!esOscuro);
  };

  return (
    <nav 
      aria-label="Barra de navegación y configuración"
      className="fixed top-4 md:top-6 right-4 md:right-8 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3EFE6]/80 dark:bg-[#1E1D1A]/85 backdrop-blur-md border border-stone-300/80 dark:border-[#2C2A26] shadow-lg shadow-black/5 dark:shadow-black/40 transition-all duration-300"
    >
      {/* Selector de idioma */}
      <div className="flex items-center gap-1">
        <button 
          onClick={() => i18n.changeLanguage('es')} 
          className={`px-2.5 py-1 rounded-full text-[11px] md:text-xs font-bold transition-all cursor-pointer ${
            i18n.language.startsWith('es') 
              ? 'bg-[#1E1D1A] text-[#F3EFE6] dark:bg-[#F3EFE6] dark:text-[#141312] shadow-xs' 
              : 'text-stone-600 dark:text-[#A39E93] hover:text-[#C25E2E] dark:hover:text-[#D96B34]'
          }`}
          aria-label="Cambiar a Español"
        >
          ES
        </button>
        <button 
          onClick={() => i18n.changeLanguage('en')} 
          className={`px-2.5 py-1 rounded-full text-[11px] md:text-xs font-bold transition-all cursor-pointer ${
            i18n.language.startsWith('en') 
              ? 'bg-[#1E1D1A] text-[#F3EFE6] dark:bg-[#F3EFE6] dark:text-[#141312] shadow-xs' 
              : 'text-stone-600 dark:text-[#A39E93] hover:text-[#C25E2E] dark:hover:text-[#D96B34]'
          }`}
          aria-label="Switch to English"
        >
          EN
        </button>
      </div>

      {/* Separador vertical sutil */}
      <div className="w-px h-3.5 bg-stone-300 dark:bg-[#35332E] mx-1" aria-hidden="true" />

      {/* Alternador de tema claro / oscuro */}
      <button
        onClick={toggleTema}
        aria-label={esOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        title={esOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        className="p-1.5 rounded-full text-stone-700 dark:text-[#A39E93] hover:text-[#C25E2E] dark:hover:text-[#D96B34] hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-all cursor-pointer"
      >
        {esOscuro ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-amber-400 hover:text-amber-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-stone-700 hover:text-[#C25E2E] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>
    </nav>
  );
};

export default BarraNavegacion;
