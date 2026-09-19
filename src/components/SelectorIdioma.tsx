import { useTranslation } from 'react-i18next';

const SelectorIdioma = () => {
  const { i18n } = useTranslation();
  return (
    <div className="absolute top-4 right-4 md:top-6 md:right-8 z-50 flex items-center gap-1 bg-[#e8e1d3]/90 dark:bg-stone-900/90 backdrop-blur-md p-1 rounded-full border border-stone-300/80 dark:border-stone-800 shadow-xl scale-90 md:scale-100">
      <button onClick={() => i18n.changeLanguage('es')} className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-black transition-all ${i18n.language.startsWith('es') ? 'bg-stone-900 dark:bg-[#f4efe6] text-[#f4efe6] dark:text-stone-900' : 'text-stone-700 dark:text-[#d6cfc2] hover:text-stone-900 dark:hover:text-[#f4efe6]'}`}>ES</button>
      <button onClick={() => i18n.changeLanguage('en')} className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-black transition-all ${i18n.language.startsWith('en') ? 'bg-stone-900 dark:bg-[#f4efe6] text-[#f4efe6] dark:text-stone-900' : 'text-stone-700 dark:text-[#d6cfc2] hover:text-stone-900 dark:hover:text-[#f4efe6]'}`}>EN</button>
    </div>
  );
};

export default SelectorIdioma;