import { useState, useEffect } from 'react';

const BotonTema = () => {
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
    <button
      onClick={toggleTema}
      aria-label={esOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className="absolute top-4 left-4 md:top-6 md:left-8 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 dark:bg-stone-800/90 backdrop-blur-md border border-stone-300 dark:border-stone-700 shadow-lg text-stone-800 dark:text-stone-200 hover:scale-105 active:scale-95 transition-all cursor-pointer"
      title={esOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {esOscuro ? (
        // Icono Sol (para pasar a claro)
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        // Icono Luna (para pasar a oscuro)
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
};

export default BotonTema;
