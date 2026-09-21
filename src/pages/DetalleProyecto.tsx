import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { proyectos } from '../data/proyectos'; 
import BarraNavegacion from '../components/BarraNavegacion';
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

  if (!p) {
    return (
      <div className="min-h-screen bg-[#F3EFE6] dark:bg-[#141312] text-stone-900 dark:text-[#F3EFE6] flex items-center justify-center font-bold">
        404 - Proyecto no encontrado
      </div>
    );
  }

  const obtenerNombreCategoria = (cat: string) => {
    if (cat === 'Multimedia') {
      return i18n.language.startsWith('es') ? 'Instalaciones & Hardware' : 'Creative Tech';
    }
    if (cat === 'Videojuegos') {
      return i18n.language.startsWith('es') ? 'Videojuegos' : 'Games';
    }
    return cat;
  };

  const esVideoYoutube = p.videoUrl?.includes('youtube.com') || p.videoUrl?.includes('youtu.be');

  return (
    <div className="min-h-screen bg-[#F3EFE6] dark:bg-[#141312] p-4 md:p-8 text-stone-900 dark:text-[#F3EFE6] font-sans relative transition-colors duration-300">
      <BarraNavegacion />
      
      {mostrarScroll && (
        <div 
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-40 animate-bounce cursor-pointer hidden md:block"
        >
          <div className="w-12 h-12 rounded-full border border-stone-300/80 dark:border-[#2C2A26] flex items-center justify-center bg-[#F3EFE6]/90 dark:bg-[#1E1D1A]/90 backdrop-blur-md shadow-2xl hover:border-[#C25E2E] dark:hover:border-[#C25E2E] transition-colors">
            <svg className="w-6 h-6 text-stone-900 dark:text-[#F3EFE6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto pt-14 md:pt-10">
        <Link 
          to="/" 
          className="text-stone-900 dark:text-[#F3EFE6] hover:text-[#C25E2E] dark:hover:text-[#D96B34] transition-colors mb-10 inline-flex items-center gap-2 font-bold group"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          <span>{i18n.language.startsWith('es') ? 'Volver a la grilla' : 'Back to grid'}</span>
        </Link>
        
        <div className="mb-10">
          <div className="flex items-center gap-3 flex-wrap mb-3">
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-[#1E1D1A] text-[#F3EFE6] rounded-md border border-stone-800 dark:border-[#2C2A26]">
              {obtenerNombreCategoria(p.categoria)}
            </span>
            <span className="text-sm font-bold text-stone-600 dark:text-[#A39E93]">
              {p.enProceso 
                ? `${p.fechaInicio.split('-').reverse().join('/')} — ${i18n.language.startsWith('es') ? 'En proceso' : 'In progress'}`
                : (p.fechaInicio === p.fechaFin 
                    ? p.fechaInicio.split('-').reverse().join('/') 
                    : `${p.fechaInicio.split('-').reverse().join('/')} — ${p.fechaFin.split('-').reverse().join('/')}`
                  )
              }
            </span>
          </div>
          <h1 className="font-ethnocentric text-2xl sm:text-3xl md:text-5xl font-normal tracking-wide text-stone-900 dark:text-[#F3EFE6] leading-tight">
            {i18n.language.startsWith('es') ? p.titulo : (p.titulo_en || p.titulo)}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-ethnocentric text-sm md:text-base font-normal tracking-wide text-stone-900 dark:text-[#F3EFE6]">
              {t('sobre')}
            </h3>
            <p className="text-stone-800 dark:text-[#A39E93] text-base md:text-lg leading-relaxed">
              {i18n.language.startsWith('es') ? p.contenidoLargo : (p.contenidoLargo_en || p.contenidoLargo)}
            </p>
            
            <div className="pt-4">
              <h3 className="font-ethnocentric text-xs md:text-sm font-normal tracking-wider text-stone-600 dark:text-[#A39E93] uppercase mb-4">
                {t('tech')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {p.tecnologias.map(tech => (
                  <span 
                    key={tech} 
                    className="bg-[#1E1D1A] text-[#F3EFE6] px-3.5 py-1.5 rounded-md text-sm border border-stone-800 dark:border-[#2C2A26] hover:border-[#C25E2E]/40 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6">
              {p.bitacoraUrl ? (
                <a 
                  href={p.bitacoraUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#1E1D1A] text-[#F3EFE6] hover:bg-[#C25E2E] dark:hover:bg-[#C25E2E] px-8 py-3.5 rounded-xl font-bold transition-all hover:scale-105 inline-block shadow-lg border border-stone-800 dark:border-[#2C2A26] hover:border-[#C25E2E] w-full text-center md:w-auto cursor-pointer"
                >
                  {i18n.language.startsWith('es') ? 'LEER BITÁCORA / PROCESO ↗' : 'READ CASE STUDY / LOG ↗'}
                </a>
              ) : p.urlExterna && p.urlExterna.trim() !== "" ? ( 
                <a 
                  href={p.urlExterna} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#1E1D1A] text-[#F3EFE6] hover:bg-[#C25E2E] dark:hover:bg-[#C25E2E] px-8 py-3.5 rounded-xl font-bold transition-all hover:scale-105 inline-block shadow-lg border border-stone-800 dark:border-[#2C2A26] hover:border-[#C25E2E] w-full text-center md:w-auto cursor-pointer"
                >
                  {t('ver_demo')}
                </a>
              ) : (
                <div className="text-stone-500 dark:text-[#A39E93] text-sm font-semibold italic">
                  {i18n.language.startsWith('es') ? "* Proyecto de hardware/offline - Documentación en video" : "* Hardware/Offline project - Video documentation only"}
                </div>
              )}
            </div>
          </div>

          <div className={`lg:col-span-7 ${p.id === 'influencers-ia' ? '' : 'lg:mt-4'}`}>
            <div className="overflow-hidden rounded-xl border border-stone-800/80 dark:border-[#2C2A26] bg-[#1E1D1A] shadow-2xl w-full">
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
                <img 
                  src={p.imagenUrl || `/proyectos/${p.id}.png`} 
                  alt={p.titulo} 
                  className="w-full h-auto object-cover" 
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'; }} 
                />
              )}
            </div>
          </div>
        </div> 

        <VisualizadorDocumento 
          url={p.figmaUrl || p.canvaUrl} 
          titulo={i18n.language.startsWith('es') ? "Memoria Técnica y Proceso de Diseño" : "Technical Report & Design Process"} 
        />

        <div className="border-t border-stone-300 dark:border-[#2C2A26] mt-24">
          <SeccionContacto />
        </div>
        
      </div> 
    </div> 
  );
};

export default DetalleProyecto;
