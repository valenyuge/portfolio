import { useTranslation } from 'react-i18next';

const SelectorIdioma = () => {
  const { i18n } = useTranslation();
  return (
    <div className="absolute top-4 right-4 md:top-6 md:right-8 z-50 flex items-center gap-1 bg-slate-800/80 backdrop-blur-md p-1 rounded-full border border-slate-700 shadow-xl scale-90 md:scale-100">
      <button onClick={() => i18n.changeLanguage('es')} className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-black transition-all ${i18n.language.startsWith('es') ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>ES</button>
      <button onClick={() => i18n.changeLanguage('en')} className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-black transition-all ${i18n.language.startsWith('en') ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>EN</button>
    </div>
  );
};

export default SelectorIdioma;