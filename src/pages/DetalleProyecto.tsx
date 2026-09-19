import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { proyectos } from '../data/proyectos'; 
import SelectorIdioma from '../components/SelectorIdioma';
import BotonTema from '../components/BotonTema';
import SeccionContacto from '../components/SeccionContacto';
import VisualizadorDocumento from '../components/VisualizadorDocumento';

const DetalleProyecto = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const p = proyectos.find(proj => proj.id === id);
  const [mostrarScroll, setMostrarScroll] = useState(false);

  useEffect(() => {
    if (p) { document.title = `${p.titulo} | Valentin Yuge`; }

    const verificarSiHayScroll = () => {
      const tieneContenidoAbajo = document.documentElement.scrollHeight > window.innerHeight + 50;
      if (tieneContenidoAbajo && window.scrollY < 50) {
        setMostrarScroll(true);
      } else {
        setMostrarScroll(false);
      }
    };

    verificarSiHayScroll();
    window.addEventListener('scroll', verificarSiHayScroll);
    window.addEventListener('resize', verificarSiHayScroll);

    return () => {
      document.title = "Valentin Yuge | Portfolio";
      window.removeEventListener('scroll', verificarSiHayScroll);
      window.removeEventListener('resize', verificarSiHayScroll);
    };
  }, [p]);

  if (!p) return <div className="min-h-screen bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 flex items-center justify-center font-bold">404 - Proyecto no encontrado</div>;

  const esVideoYoutube = p.videoUrl?.includes('youtube.com') || p.videoUrl?.includes('youtu.be');

  return (
    <div className="min-h-screen bg-[#f4efe6] dark:bg-stone-950 p-4 md:p-8 text-stone-900 dark:text-stone-100 font-sans relative transition-colors duration-300">
      <BotonTema />
      <SelectorIdioma />
      
      {mostrarScroll && (
        <div 
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-40 animate-bounce cursor-pointer hidden md:block"
        >
          <div className="w-12 h-12 rounded-full border border-stone-300/80 dark:border-stone-700 flex items-center justify-center bg-[#e8e1d3] dark:bg-stone-900/80 backdrop-blur-md shadow-2xl shadow-stone-900/10 dark:shadow-stone-100/10 hover:border-stone-500 dark:hover:border-stone-500 transition-colors">
            <svg className="w-6 h-6 text-stone-900 dark:text-stone-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <Link to="/" className="text-stone-900 dark:text-stone-200 hover:text-stone-600 dark:hover:text-stone-400 transition-colors mb-12 inline-block font-bold">
          {t('volver')}
        </Link>
        
        <div className="mb-10">
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 rounded-full border border-stone-800 dark:border-stone-300">
                {p.categoria}
            </span>
            <h1 className="text-5xl font-black mt-4 mb-6">
              {i18n.language.startsWith('es') ? p.titulo : (p.titulo_en || p.titulo)}
            </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-200">{t('sobre')}</h3>
            <p className="text-stone-800 dark:text-stone-300 text-lg leading-relaxed">
                {i18n.language.startsWith('es') ? p.contenidoLargo : (p.contenidoLargo_en || p.contenidoLargo)}
            </p>
            
            <div className="pt-6">
                <h3 className="text-sm font-bold text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-4">{t('tech')}</h3>
                <div className="flex flex-wrap gap-2">
                    {p.tecnologias.map(t => (
                        <span key={t} className="bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 px-4 py-2 rounded-xl text-sm border border-stone-800 dark:border-stone-300">{t}</span>
                    ))}
                </div>
            </div>

            <div className="pt-8">
              {p.bitacoraUrl ? (
                <a href={p.bitacoraUrl} target="_blank" rel="noopener noreferrer" 
                  className="bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 px-10 py-4 rounded-2xl font-black transition-all hover:scale-105 inline-block shadow-lg shadow-stone-900/10 dark:shadow-stone-200/10 w-full text-center md:w-auto">
                  {i18n.language.startsWith('es') ? 'LEER BITÁCORA / PROCESO ↗' : 'READ CASE STUDY / LOG ↗'}
                </a>
              ) : p.urlExterna && p.urlExterna.trim() !== "" ? ( 
                <a href={p.urlExterna} target="_blank" rel="noopener noreferrer" 
                  className="bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 px-10 py-4 rounded-2xl font-black transition-all hover:scale-105 inline-block shadow-lg shadow-stone-900/10 dark:shadow-stone-200/10 w-full text-center md:w-auto">
                  {t('ver_demo')}
                </a>
              ) : (
                <div className="text-stone-500 dark:text-stone-400 text-sm font-bold italic">
                  {i18n.language.startsWith('es') ? "* Proyecto de hardware/offline - Documentación en video" : "* Hardware/Offline project - Video documentation only"}
                </div>
              )}
            </div>
          </div>

          <div className={`lg:col-span-7 ${p.id === 'influencers-ia' ? '' : 'lg:mt-14'}`}>
              <div className="overflow-hidden rounded-3xl border border-stone-800 dark:border-stone-300 bg-stone-900 dark:bg-stone-100/50 shadow-2xl w-full">
                {p.videoUrl ? (
                  esVideoYoutube ? (
                    <div className="aspect-video">
                      <iframe className="w-full h-full" src={p.videoUrl.replace("watch?v=", "embed/")} title={`Video de ${p.titulo}`} allowFullScreen></iframe>
                    </div>
                  ) : (
                    <video className="w-full h-auto max-h-[70vh] object-contain bg-black" controls muted loop>
                      <source src={p.videoUrl} type="video/mp4" />
                    </video>
                  )
                ) : (
                  <img src={p.imagenUrl || `/proyectos/${p.id}.png`} alt={p.titulo} className="w-full h-auto object-cover" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'; }} />
                )}
              </div>
          </div>
        </div> 

        <VisualizadorDocumento 
            url={p.figmaUrl || p.canvaUrl} 
            titulo={i18n.language.startsWith('es') ? "Memoria Técnica y Proceso de Diseño" : "Technical Report & Design Process"} 
        />

        <div className="border-stone-300 dark:border-stone-800">
          <SeccionContacto />
        </div>
        
      </div> 
    </div> 
  );
};

export default DetalleProyecto;