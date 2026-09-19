import { useTranslation } from 'react-i18next';

const SeccionContacto = () => {
  const { t } = useTranslation();
  return (
    <footer className="max-w-4xl mx-auto mt-32 mb-16 text-center border-t border-stone-300 dark:border-stone-800 pt-16">
      <h2 className="text-3xl font-black mb-4">{t('contacto_tit')}</h2>
      <p className="text-stone-600 dark:text-stone-400 mb-8">{t('contacto_desc')}</p>
      <div className="flex justify-center flex-wrap gap-6">
        <a 
          href="mailto:valentinyuge@gmail.com" 
          className="flex items-center gap-2 bg-white dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100 px-6 py-3 rounded-2xl transition-all border border-stone-300 dark:border-stone-700 shadow-md font-bold"
        >
          <span>📧</span><span>Email</span>
        </a>
        <a 
          href="https://linkedin.com/in/valentinyuge" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-2 bg-white dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100 px-6 py-3 rounded-2xl transition-all border border-stone-300 dark:border-stone-700 shadow-md font-bold"
        >
          <span>🔗</span><span>LinkedIn</span>
        </a>
        <a 
          href="https://github.com/valenyuge" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-2 bg-white dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100 px-6 py-3 rounded-2xl transition-all border border-stone-300 dark:border-stone-700 shadow-md font-bold"
        >
          <span>🐙</span><span>GitHub</span>
        </a>
      </div>
    </footer>
  );
};

export default SeccionContacto;