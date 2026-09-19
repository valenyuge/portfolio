import { useTranslation } from 'react-i18next';

const SelectorIdioma = () => {
  const { i18n } = useTranslation();
  return (
    <div className="absolute top-4 right-4 md:top-6 md:right-8 z-50 flex items-center gap-1 bg-white dark:bg-stone-800/80 backdrop-blur-md p-1 rounded-full border border-stone-200 dark:border-stone-700 shadow-xl scale-90 md:scale-100">
      <button onClick={() => i18n.changeLanguage('es')} className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-black transition-all ${i18n.language.startsWith('es') ? 'bg-stone-800 dark:bg-stone-200 text-stone-100 dark:text-stone-900 text-stone-900 dark:text-stone-100' : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:text-stone-100'}`}>ES</button>
      <button onClick={() => i18n.changeLanguage('en')} className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-black transition-all ${i18n.language.startsWith('en') ? 'bg-stone-800 dark:bg-stone-200 text-stone-100 dark:text-stone-900 text-stone-900 dark:text-stone-100' : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:text-stone-100'}`}>EN</button>
    </div>
  );
};

export default SelectorIdioma;