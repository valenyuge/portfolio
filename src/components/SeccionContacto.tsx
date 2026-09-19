import { useTranslation } from 'react-i18next';

const SeccionContacto = () => {
  const { t } = useTranslation();

  const enlaces = [
    { href: 'mailto:valentinyuge@gmail.com', icon: '📧', label: 'Email', external: false },
    { href: 'https://linkedin.com/in/valentinyuge', icon: '🔗', label: 'LinkedIn', external: true },
    { href: 'https://github.com/valenyuge', icon: '🐙', label: 'GitHub', external: true }
  ];

  return (
    <footer className="max-w-4xl mx-auto mt-32 mb-16 text-center border-t border-stone-300 dark:border-stone-800 pt-16">
      <h2 className="text-3xl font-black mb-4 text-stone-900 dark:text-stone-100">{t('contacto_tit')}</h2>
      <p className="text-stone-600 dark:text-stone-400 mb-8">{t('contacto_desc')}</p>
      <div className="flex justify-center flex-wrap gap-6">
        {enlaces.map((enlace) => (
          <a 
            key={enlace.label}
            href={enlace.href}
            target={enlace.external ? "_blank" : undefined}
            rel={enlace.external ? "noopener noreferrer" : undefined}
            className="flex items-center gap-2 bg-white dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100 visited:text-stone-900 dark:visited:text-stone-100 px-6 py-3 rounded-2xl transition-all border border-stone-300 dark:border-stone-700 shadow-md font-bold"
          >
            <span>{enlace.icon}</span>
            <span className="text-stone-900 dark:text-stone-100">{enlace.label}</span>
          </a>
        ))}
      </div>
    </footer>
  );
};

export default SeccionContacto;