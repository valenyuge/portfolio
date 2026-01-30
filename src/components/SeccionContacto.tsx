import { useTranslation } from 'react-i18next';

const SeccionContacto = () => {
  const { t } = useTranslation();
  return (
    <footer className="max-w-4xl mx-auto mt-32 mb-16 text-center border-t border-slate-800 pt-16">
      <h2 className="text-3xl font-black mb-4">{t('contacto_tit')}</h2>
      <p className="text-slate-400 mb-8">{t('contacto_desc')}</p>
      <div className="flex justify-center flex-wrap gap-6">
        <a href="mailto:valentinyuge@gmail.com" className="flex items-center gap-2 bg-slate-800 hover:bg-blue-600 px-6 py-3 rounded-2xl transition-all border border-slate-700"><span>📧</span><span className="font-bold">Email</span></a>
        <a href="https://linkedin.com/in/valentinyuge" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-slate-800 hover:bg-blue-700 px-6 py-3 rounded-2xl transition-all border border-slate-700"><span>🔗</span><span className="font-bold">LinkedIn</span></a>
        <a href="https://github.com/valenyuge" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-2xl transition-all border border-slate-700"><span>🐙</span><span className="font-bold">GitHub</span></a>
      </div>
    </footer>
  );
};

export default SeccionContacto;